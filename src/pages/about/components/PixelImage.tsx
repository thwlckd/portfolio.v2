import { HTMLAttributes, MouseEvent, useEffect, useRef } from 'react';

type Particle = {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  dx: number;
  dy: number;
  color: string;
  forcePower: number;
  radius: number;
};

interface Props extends HTMLAttributes<HTMLCanvasElement> {
  src: string;
  pixel?: {
    size: number;
    gap: number;
  };
}

const PixelImage = ({ src, pixel = { size: 15, gap: 3 }, ...rest }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  const createParticles = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) {
      return [];
    }

    const imageWidth = image.width;
    const imageHeight = image.height;
    const particles: Particle[] = [];

    canvas.width = imageWidth;
    canvas.height = imageHeight;
    canvasCtx.drawImage(image, 0, 0, imageWidth, imageHeight);

    for (let y = 0; y < imageHeight; y += pixel.size) {
      for (let x = 0; x < imageWidth; x += pixel.size) {
        const imageData = canvasCtx.getImageData(x, y, pixel.size, pixel.size);
        const data = imageData.data; // rgba 반복 [r1, g1, b1, a1, r2, g2, b2, a2, ...]
        const accColorData = { r: 0, g: 0, b: 0, count: 0 };

        for (let i = 0; i < data.length; i += 4) {
          // alpha값(0~255) 10보다 낮은 투명도면 픽셀 만들지 않음
          if (data[i + 3] < 10) {
            continue;
          }

          accColorData.r += data[i];
          accColorData.g += data[i + 1];
          accColorData.b += data[i + 2];
          accColorData.count++;
        }

        if (accColorData.count === 0) {
          continue;
        }

        particles.push({
          currentX: x,
          currentY: y,
          targetX: x,
          targetY: y,
          dx: 0,
          dy: 0,
          color: `rgb(${accColorData.r / accColorData.count}, ${accColorData.g / accColorData.count}, ${accColorData.b / accColorData.count})`, // 합계 rgb 평균값을 픽셀의 컬러로 사용
          forcePower: Math.random() * 500 + 0.5,
          radius: Math.random() * 60 + 20,
        });
      }
    }

    return particles;
  };

  const updateParticles = (
    canvasCtx: CanvasRenderingContext2D,
    particles: Particle[],
    mouseX: number,
    mouseY: number,
  ) => {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

    for (const p of particles) {
      const dx = p.targetX - mouseX;
      const dy = p.targetY - mouseY;
      const dist = Math.sqrt(dx ** 2 + dy ** 2);
      const stiffness = 0.05;
      const friction = Math.random() * 0.6 + 0.3;
      const offset = (pixel.size - pixel.gap) / 2;

      if (dist < p.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (p.radius - dist) / p.radius;
        const push = force * p.forcePower;

        p.dx += Math.cos(angle) * push;
        p.dy += Math.sin(angle) * push;
      }

      // 복원력
      p.dx += (p.currentX - p.targetX) * stiffness;
      p.dy += (p.currentY - p.targetY) * stiffness;

      // 감속
      p.dx *= friction;
      p.dy *= friction;

      p.targetX += p.dx;
      p.targetY += p.dy;

      canvasCtx.fillStyle = p.color;
      canvasCtx.beginPath();
      canvasCtx.arc(p.targetX + offset, p.targetY + offset, offset, 0, Math.PI * 2);
      canvasCtx.fill();
    }
  };

  useEffect(
    function pixelationRAF() {
      const canvas = canvasRef.current;
      const canvasCtx = canvas?.getContext('2d');
      const image = new Image();

      if (!canvas || !canvasCtx) {
        return;
      }

      image.src = src;
      image.onload = () => {
        const particles = createParticles(image);
        const canvasWidth = image.width;
        const canvasHeight = image.height;

        particlesRef.current = particles;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const animatePixelRAF = () => {
          updateParticles(canvasCtx, particlesRef.current, mouseRef.current.x, mouseRef.current.y);
          animationRef.current = requestAnimationFrame(animatePixelRAF);
        };

        animatePixelRAF();
      };

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    },
    [src, pixel, pixel.size, pixel.gap],
  );

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouseRef.current.x = (e.clientX - rect.left) * scaleX;
    mouseRef.current.y = (e.clientY - rect.top) * scaleY;
  };

  return <canvas ref={canvasRef} onMouseMove={handleMouseMove} {...rest} />;
};

export default PixelImage;
