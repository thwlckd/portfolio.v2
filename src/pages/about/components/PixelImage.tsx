import { HTMLAttributes, useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  dx: number;
  dy: number;
  color: string;
  forceMultiplier: number; // 🔥 각 입자별 튕김 세기
  radius: number; // 👈 각 입자별 반응 반경
};

interface Props extends HTMLAttributes<HTMLCanvasElement> {
  src: string;
  pixel?: {
    size: number;
    gap: number;
  };
  scale?: number;
}

const PixelImage = ({ src, pixel = { size: 15, gap: 3 }, scale: imageScale = 0.4, ...rest }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  const pixelSize = pixel.size;
  const gap = pixel.gap;
  const scale = imageScale;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = window.parent.innerWidth;
    const ch = window.parent.innerHeight;
    canvas.width = cw;
    canvas.height = ch;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = src;

    image.onload = () => {
      const iw = image.width * scale;
      const ih = image.height * scale;
      const dx = (cw - iw) / 2;
      const dy = (ch - ih) / 2;

      // draw image offscreen
      const offCanvas = document.createElement('canvas');
      offCanvas.width = iw;
      offCanvas.height = ih;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;
      offCtx.drawImage(image, 0, 0, iw, ih);

      const particles: Particle[] = [];

      for (let y = 0; y < ih; y += pixelSize) {
        for (let x = 0; x < iw; x += pixelSize) {
          const imageData = offCtx.getImageData(x, y, pixelSize, pixelSize);
          const data = imageData.data;

          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha < 10) continue;

            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }

          if (count === 0) continue;

          r = r / count;
          g = g / count;
          b = b / count;

          const px = x + dx;
          const py = y + dy;

          particles.push({
            x: px,
            y: py,
            tx: px,
            ty: py,
            dx: 0,
            dy: 0,
            color: `rgb(${r}, ${g}, ${b})`,
            forceMultiplier: Math.random() * (500 - 0.5) + 0.5,
            radius: Math.random() * 60 + 20,
          });
        }
      }

      particlesRef.current = particles;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particlesRef.current) {
          const dx = p.tx - mouse.current.x;
          const dy = p.ty - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (p.radius - dist) / p.radius;
            const push = force * 1 * p.forceMultiplier; // 💥 튕김 세기 반영

            p.dx += Math.cos(angle) * push;
            p.dy += Math.sin(angle) * push;
          }

          // 복원력
          const spring = 0.01; // 더 빠르게 원위치로 가게
          p.dx += (p.x - p.tx) * spring;
          p.dy += (p.y - p.ty) * spring;

          // 감속
          const 감속max = 0.9;
          const 감속min = 0.3;
          const 감속 = Math.random() * (감속max - 감속min) + 감속min;
          p.dx *= 감속;
          p.dy *= 감속;

          p.tx += p.dx;
          p.ty += p.dy;

          ctx.fillStyle = p.color;
          const offset = (pixelSize - gap) / 2;
          ctx.beginPath();
          ctx.arc(p.tx + offset, p.ty + offset, (pixelSize - gap) / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      mouse.current.x = (e.clientX - rect.left) * scaleX;
      mouse.current.y = (e.clientY - rect.top) * scaleY;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <canvas ref={canvasRef} {...rest} />;
};

export default PixelImage;
