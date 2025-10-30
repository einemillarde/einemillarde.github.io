import { useRef, useEffect, useState } from 'react';
import '../styles/pages/StringArt.scss';

export default function StringArt() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reset1Ref = useRef<HTMLDivElement>(null);
  const reset2Ref = useRef<HTMLDivElement>(null);
  const reset3Ref = useRef<HTMLDivElement>(null);

  const initialNumNails = 80;
  const initialThreadWeight = 0.5;
  const initialReverseContrast = false;

  const [numNails, setNumNails] = useState<number>(initialNumNails);
  const [threadWeight, setThreadWeight] = useState<number>(initialThreadWeight);
  const [reverseContrast, setReverseContrast] = useState<boolean>(initialReverseContrast);

  function generateLines() {
    let lines = [];
    for (let i = 0; i < 500; i++) {
      lines.push(Math.floor(Math.random() * (numNails + 1)))
    }
    return lines;
  }

  const lines = generateLines();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reset1 = reset1Ref.current;
    if (!reset1) return;
    const reset2 = reset2Ref.current;
    if (!reset2) return;
    const reset3 = reset3Ref.current;
    if (!reset3) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const radius = canvas.width / 2;

    reset1.style.opacity = numNails == initialNumNails ? '0' : '1';
    reset2.style.opacity = threadWeight == initialThreadWeight ? '0' : '1';
    reset3.style.opacity = reverseContrast == initialReverseContrast ? '0' : '1';;

    // Draw on canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ctx.fillStyle = reverseContrast ? 'black' : 'white';
    ctx.fill();

    ctx.beginPath()
    for (const line of lines) {
      let angle = line * 2 * Math.PI / numNails;
      let x = (radius - 10) * Math.cos(angle) + radius;
      let y = (radius - 10) * Math.sin(angle) + radius;
      ctx.lineTo(x, y);
    }
    ctx.lineWidth = threadWeight;
    ctx.strokeStyle = reverseContrast ? 'white' : 'black';
    ctx.stroke();

    ctx.fillStyle = 'green';
    for (let alpha = 0; alpha < 360; alpha += 2 * Math.PI / numNails) {
      ctx.fillRect((radius - 10) * Math.cos(alpha) + radius - 1, (radius - 10) * Math.sin(alpha) + radius - 1, 3, 3);
    }

    // End of drawing
  }, [numNails, threadWeight, reverseContrast]);

  return (
    <main className='string-art'>
      <h1>String Art Generator (In progress)</h1>
      <div>
        <div className='input-section'>
          <div>
            <label>Number of nails:</label>
            <label>Thread weight:</label>
            <label>Reverse contrast:</label>
          </div>
          <div>
            <input type='text' value={String(numNails)} onChange={element => {
              const num = Number(element.target.value);
              if (!Number.isNaN(num)) setNumNails(num);
            }} />
            <input type='range' value={String((threadWeight - 0.2) / 0.008)} onChange={element => {
              const num = 0.008 * Number(element.target.value) + 0.2;
              setThreadWeight(num);
            }} />
            <input type='checkbox' checked={reverseContrast} onChange={element => {
              setReverseContrast(element.target.checked);
            }}/>
          </div>
          <div>
            <div ref={reset1Ref} onClick={_ => { setNumNails(initialNumNails) }} />
            <div ref={reset2Ref} onClick={_ => { setThreadWeight(initialThreadWeight) }} />
            <div ref={reset3Ref} onClick={_ => { setReverseContrast(initialReverseContrast) }} />
          </div>
        </div>
        <canvas ref={canvasRef} width='1024' height='1024' />
      </div>
    </main>
  );
}