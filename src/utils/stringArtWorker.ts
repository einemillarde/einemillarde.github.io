function getError(current: Uint8ClampedArray, target: Uint8ClampedArray) {
  let error = 0;
  for (let i = 0; i < current.length; i += 4) {
    const diff = current[i] - target[i];
    error += diff * diff;
  }
  return error;
}

function drawLine(ctx: OffscreenCanvasRenderingContext2D, from: number, to: number, nails: number[][]) {
  ctx.beginPath();
  let [x, y] = nails[from];
  ctx.moveTo(x, y);
  [x, y] = nails[to];
  ctx.lineTo(x, y);
  ctx.stroke();
}

self.onmessage = async (event: MessageEvent<{ numLines: number, numNails: number, imageFile: File, radius: number, threadWeight: number, reverseContrast: boolean }>) => {
  const { numLines, numNails, imageFile, radius, threadWeight, reverseContrast } = event.data;

  const nails = Array.from({ length: numNails }, (_, i) => {
    const angle = (i / numNails) * 2 * Math.PI;
    return [radius + radius * Math.cos(angle), radius + radius * Math.sin(angle)];
  });

  console.log(nails);

  const bitmap = await createImageBitmap(imageFile);

  const canvas = new OffscreenCanvas(radius * 2, radius * 2);
  canvas.width = radius * 2;
  canvas.height = radius * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    self.postMessage({ error: 'Could not get OffscreenCanvasRenderingContext2D' });
    return;
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.fillStyle = reverseContrast ? 'black' : 'white';
  ctx.fill();

  ctx.lineWidth = threadWeight;
  ctx.strokeStyle = reverseContrast ? 'white' : 'black';

  for (let i = 0; i < imageData.length; i += 4) {
    const red = imageData[i];
    const green = imageData[i + 1];
    const blue = imageData[i + 2];
    const grayscale = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    imageData[i] = grayscale;
    imageData[i + 1] = grayscale;
    imageData[i + 2] = grayscale;
  }

  const lines: number[] = [0];

  for (let i = 1; i < numLines; i++) {
    const prevCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let bestError = Infinity;
    let bestNail = -1;
    for (let j = 0; j < numNails; j++) {
      if (j === lines[lines.length - 1] || j === lines[lines.length - 2]) continue;
      drawLine(ctx, lines[lines.length - 1], j, nails);
      const error = getError(ctx.getImageData(0, 0, canvas.width, canvas.height).data, imageData);
      if (error < bestError) {
        bestError = error;
        bestNail = j;
      }
      ctx.putImageData(prevCanvasState, 0, 0);
    }
    if (bestNail !== -1) {
      drawLine(ctx, lines[lines.length - 1], bestNail, nails);
      lines.push(bestNail);
    } else console.log('no best nail found');
    if (i % 10 === 0) self.postMessage({ progress: i / numLines, newLines: lines.slice(i - 10, i === numLines - 1 ? i + 1 : i) });
  }

  self.postMessage({ done: true, lines: lines });
};