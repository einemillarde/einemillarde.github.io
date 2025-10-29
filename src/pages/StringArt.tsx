import { useRef, useEffect, useState } from 'react';
import '../styles/pages/StringArt.scss';

function generateLines(numNails: number, threadWeight: number) {
  let lines = [];
  for (let i = 0; i < 500; i++) {
    lines.push(Math.floor(Math.random() * (numNails + 1)))
  }
  return lines;
}

export default function StringArt() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numNails, setNumNails] = useState<number>(80);
  const [threadWeight, setThreadWeight] = useState<number>(0.5);

  const lines = generateLines(numNails, threadWeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const radius = canvas.width / 2;

    // Draw on canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.fillStyle = 'blue';
    for (let alpha = 0; alpha < 360; alpha += 2 * Math.PI / numNails) {
      ctx.fillRect((radius - 10) * Math.cos(alpha) + radius, (radius - 10) * Math.sin(alpha) + radius, 2, 2);
    }

    ctx.beginPath()
    for (const line of lines) {
      let angle = line * 2 * Math.PI / numNails;
      let x = (radius - 10) * Math.cos(angle) + radius;
      let y = (radius - 10) * Math.sin(angle) + radius;
      ctx.lineTo(x, y);
    }
    ctx.lineWidth = threadWeight;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // End of drawing
  }, [numNails, threadWeight, lines]);

  return (
    <main className='string-art'>
      <h1>String Art Generator (In progress)</h1>
      <div>
        <div className='input-section'>
          <div>
            <label>Number of nails:</label>
            <label>Thread weight:</label>
          </div>
          <div>
            <input value={String(numNails)} onChange={element => {
              const num = Number(element.target.value);
              if (!Number.isNaN(num)) setNumNails(num);
            }} />
            <input type='range' onChange={element => {
              const num = 0.008 * Number(element.target.value) + 0.2;
              setThreadWeight(num);
            }} />
          </div>
        </div>
        <canvas ref={canvasRef} width='1024' height='1024' />
      </div>
    </main>
  );
}