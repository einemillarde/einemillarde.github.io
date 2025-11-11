function getError(current: Uint8ClampedArray, target: Uint8ClampedArray) {
  let error = 0;
  for (let i = 0; i < current.length; i += 4) {
    const diff = current[i] - target[i];
    error += Math.abs(diff / 255);
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

self.onmessage = async (event: MessageEvent<{ numNails: number, imageFile: File, radius: number, threadWeight: number, reverseContrast: boolean }>) => {
  console.time();

  const { numNails, imageFile, radius, threadWeight, reverseContrast } = event.data;

  const nails = Array.from({ length: numNails }, (_, i) => {
    const angle = (i / numNails) * 2 * Math.PI;
    return [radius + radius * Math.cos(angle), radius + radius * Math.sin(angle)];
  });

  const bitmap = await createImageBitmap(imageFile);

  const canvas = new OffscreenCanvas(radius * 2, radius * 2);
  canvas.width = radius * 2;
  canvas.height = radius * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    self.postMessage({ error: 'no context' });
    return;
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.fillStyle = reverseContrast ? 'black' : 'white';
  ctx.fill();

  ctx.lineWidth = threadWeight * radius / 512;
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

  let prevError: number;
  let error = Infinity;

  do {
    prevError = error;
    const prevCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let bestError = Infinity;
    let bestNail = -1;
    for (let j = 0; j < numNails; j++) {
      if (j === lines[lines.length - 1] || j === lines[lines.length - 2]) continue;
      drawLine(ctx, lines[lines.length - 1], j, nails);
      const error0 = getError(ctx.getImageData(0, 0, canvas.width, canvas.height).data, imageData);
      if (error0 < bestError) {
        bestError = error0;
        bestNail = j;
      }
      ctx.putImageData(prevCanvasState, 0, 0);
    }
    if (bestNail !== -1) {
      drawLine(ctx, lines[lines.length - 1], bestNail, nails);
      lines.push(bestNail);
      error = bestError;
    }
  } while (error < prevError);

  console.log(`error: ${error}\nnum lines: ${lines.length - 1}`);
  self.postMessage({ imgData: ctx.getImageData(0, 0, canvas.width, canvas.height) });

  console.timeEnd();
  console.timeLog();
};