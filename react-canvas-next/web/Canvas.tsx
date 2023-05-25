import { PropsWithChildren, useEffect, useRef } from 'react'
import Root from '../core/container/root';
import Renderer from './renderer';

export interface CanvasProps {
  width?: number;
  height?: number;
}

export const Canvas: React.FC<PropsWithChildren<CanvasProps>> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const root = useRef<Root | null>(null);

  useEffect(() => {
    root.current = new Root({});

    const renderer = new Renderer(canvasRef.current, root.current, {});
    renderer.start();

    return () => {
      renderer.stop();
      root.current?.unmount();
      root.current = null;
    }
  }, []);

  useEffect(() => {
    root.current?.render(children);
  });

  return (
    <canvas ref={canvasRef}>{children}</canvas>
  )
}
