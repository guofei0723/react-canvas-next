import { ReactNode, useEffect, useRef } from 'react'
import Root from '../core/react-renderer/root';
import Renderer from './renderer';
import { FiberProvider, useContextBridge } from 'its-fine';

export interface CanvasProps {
  width?: number;
  height?: number;
  children?: ReactNode;
}

const CanvasImpl: React.FC<CanvasProps> = ({
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

  const ContextBridge = useContextBridge();

  useEffect(() => {
    root.current?.render(<ContextBridge>{children}</ContextBridge>);
  });

  return (
    <canvas ref={canvasRef} />
  )
}

export const  Canvas: React.FC<CanvasProps> = (props) => {
  return (
    <FiberProvider>
      <CanvasImpl {...props} />
    </FiberProvider>
  )
}
