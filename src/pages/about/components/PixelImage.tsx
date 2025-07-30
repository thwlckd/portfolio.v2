import styled from '@emotion/styled';
import { HTMLAttributes, MouseEvent, useCallback, useEffect, useRef } from 'react';
import { random, throttle } from 'es-toolkit';

type Particle = {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  dx: number;
  dy: number;
  color: string;
  force: number;
  radius: number;
};

type ImageConfig = {
  src: string;
  width: number;
  height: number;
  x: ((canvasWidth: number) => number) | number;
  y: ((canvasHeight: number) => number) | number;
};

interface Props extends HTMLAttributes<HTMLCanvasElement> {
  images: ImageConfig[];
  pixelSize: number;
  gap: number;
}

const PixelImage = ({ images, pixelSize, gap, ...rest }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const createParticlesFromImage = useCallback(
    (image: HTMLImageElement, imageConfig: ImageConfig): Particle[] => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const particles: Particle[] = [];

      if (!canvasRef.current || !ctx) {
        return [];
      }

      canvas.width = imageConfig.width;
      canvas.height = imageConfig.height;
      ctx.drawImage(image, 0, 0, imageConfig.width, imageConfig.height);

      for (let y = 0; y < imageConfig.height; y += pixelSize) {
        for (let x = 0; x < imageConfig.width; x += pixelSize) {
          const data = ctx.getImageData(x, y, pixelSize, pixelSize).data; // rgba값 배열 데이터 [r1,g1,b1,a1,r2,g2,b2,a2]
          const colorData = { r: 0, g: 0, b: 0, count: 0 };

          for (let i = 0; i < data.length; i += 4) {
            // alpha(0-225)값 10 미만 투명도면 픽셀 만들지 않음
            if (data[i + 3] < 10) {
              continue;
            }
            colorData.r += data[i];
            colorData.g += data[i + 1];
            colorData.b += data[i + 2];
            colorData.count++;
          }

          if (colorData.count === 0) {
            continue;
          }

          const averageRGB = `rgb(${colorData.r / colorData.count}, ${colorData.g / colorData.count}, ${colorData.b / colorData.count})`;
          const offsetX = typeof imageConfig.x === 'number' ? imageConfig.x : imageConfig.x(canvasRef.current.width);
          const offsetY = typeof imageConfig.y === 'number' ? imageConfig.y : imageConfig.y(canvasRef.current.height);
          const posX = x + offsetX;
          const posY = y + offsetY;

          particles.push({
            currentX: posX,
            currentY: posY,
            targetX: posX,
            targetY: posY,
            dx: random(-1000, 1000),
            dy: random(-1000, 1000),
            color: averageRGB,
            force: random(50, 400),
            radius: random(20, 40),
          });
        }
      }

      return particles;
    },
    [pixelSize],
  );

  const animatePixelation = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const offset = (pixelSize - gap) / 2;

      for (const p of particlesRef.current) {
        const dx = p.targetX - mouseRef.current.x;
        const dy = p.targetY - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const friction = 0.5;
        const stiffness = 0.03;

        if (dist < p.radius) {
          const angle = Math.atan2(dy, dx);
          const push = ((p.radius - dist) / p.radius) * p.force;
          p.dx += Math.cos(angle) * push;
          p.dy += Math.sin(angle) * push;
        }

        p.dx += (p.currentX - p.targetX) * stiffness;
        p.dy += (p.currentY - p.targetY) * stiffness;
        p.dx *= friction;
        p.dy *= friction;
        p.targetX += p.dx;
        p.targetY += p.dy;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.targetX, p.targetY, offset, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(() => {
        animatePixelation(ctx);
      });
    },
    [gap, pixelSize],
  );

  useEffect(
    function pixelationRAF() {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      canvas.width = canvas.getBoundingClientRect().width;
      canvas.height = canvas.getBoundingClientRect().height;

      const imagePromises = images.map(
        (img) =>
          new Promise<Particle[]>((resolve, reject) => {
            const image = new Image();
            image.src = img.src;
            image.onload = () => {
              try {
                resolve(createParticlesFromImage(image, img));
              } catch (error) {
                reject(`create particle failed!, ${error}`);
              }
            };
            image.onerror = (error) => reject(`image load failed! ${error}`);
          }),
      );

      Promise.all(imagePromises)
        .then((results) => {
          particlesRef.current = results.flat();
          animatePixelation(ctx);
        })
        .catch(console.error);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    },
    [animatePixelation, createParticlesFromImage, images],
  );

  const handleMouseMove = throttle((e: MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();

    if (!canvasRef.current || !rect) {
      return;
    }

    mouseRef.current.x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
    mouseRef.current.y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);
  }, 16);

  return <Canvas ref={canvasRef} onMouseMove={handleMouseMove} {...rest} />;
};

export default PixelImage;

const Canvas = styled.canvas({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
});
