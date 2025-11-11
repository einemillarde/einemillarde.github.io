import { useRef, useState, useEffect } from 'react';
import '../styles/pages/StringArt.scss';
import ImageInput from '../components/ImageInput';

export default function StringArt() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const initialNumNails = 120;
  const initialThreadWeight = 1;
  const initialReverseContrast = false;

  const [imageFile, setImageFile] = useState<File | undefined>();

  const [numNails, setNumNails] = useState<number>(initialNumNails);
  const [threadWeight, setThreadWeight] = useState<number>(initialThreadWeight);
  const [reverseContrast, setReverseContrast] = useState<boolean>(initialReverseContrast);

  const resetRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('no canvas')
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('no context')
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = `${canvas.width / 29.25}px Consolas`;
    ctx.fillText('Upload an image and click generate to view results.', canvas.width / 51.2, canvas.width / 2.56);
    ctx.fillText("(trust me, it's good, not yet tho)", canvas.width / 51.2, canvas.width / 2.27);
  }, []);

  useEffect(() => {
    if (resetRefs[1].current) resetRefs[1].current.style.opacity = numNails === initialNumNails ? '0' : '1';
    if (resetRefs[2].current) resetRefs[2].current.style.opacity = threadWeight === initialThreadWeight ? '0' : '1';
    if (resetRefs[3].current) resetRefs[3].current.style.opacity = reverseContrast === initialReverseContrast ? '0' : '1';

    for (const ref of resetRefs) {
      if (ref.current) ref.current.style.cursor = ref.current.style.opacity === '1' ? 'pointer' : 'default';
    }

    if (resetRefs[0].current) resetRefs[0].current.style.opacity = '0';
  }, [numNails, threadWeight, reverseContrast]);

  function generateStringArt() {
    if (!imageFile || !imageFile?.type.startsWith('image/')) {
      console.log('No image file selected');
      return;
    }
    const worker = new Worker(new URL('../utils/stringArtWorker.ts', import.meta.url), { type: 'module' });

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('no canvas')
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('no context')
      return;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText('Generating...', canvas.width / 2, canvas.height / 2);

    worker.postMessage({
      numNails: numNails,
      imageFile: imageFile,
      radius: canvas.width / 2,
      threadWeight: threadWeight,
      reverseContrast: reverseContrast
    });

    worker.onmessage = (event) => {
      const { imgData: imgData } = event.data;
      if (imgData) {
        ctx.putImageData(imgData, 0, 0);
        const audio = new Audio('../assets/alarm-sound.mp3');
        audio.play();
      }
    }
  }

  return (
    <main className='string-art'>
      <h1>String Art Generator</h1>
      <div>
        <div className='input-section'>
          <div className='labels'>
            <label>Input image:</label>
            <label>Number of nails:</label>
            <label>Thread weight:</label>
            <label>Reverse contrast:</label>
          </div>
          <div className='inputs'>
            <ImageInput onChange={e => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}/>
            <input type='text' value={String(numNails)} onChange={e => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num)) setNumNails(num);
            }} />
            <input type='range' value={String((threadWeight - 0.5) / 0.015)} onChange={e => {
              const num = 0.015 * Number(e.target.value) + 0.5;
              setThreadWeight(num);
            }} />
            <input type='checkbox' checked={reverseContrast} onChange={e => {
              setReverseContrast(e.target.checked);
            }}/>
          </div>
          <div className='reset-buttons'>
            <div ref={resetRefs[0]} />
            <div ref={resetRefs[1]} onClick={_ => { setNumNails(initialNumNails) }} />
            <div ref={resetRefs[2]} onClick={_ => { setThreadWeight(initialThreadWeight) }} />
            <div ref={resetRefs[3]} onClick={_ => { setReverseContrast(initialReverseContrast) }} />
          </div>
          <button onClick={() => generateStringArt()}>Generate</button>
        </div>
        <canvas ref={canvasRef} width={512} height={512} />
      </div>
    </main>
  );
}
