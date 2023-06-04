import { CSSProperties, ReactNode, useEffect, useRef } from 'react'
import Root from '../core/react-renderer/root';
import Renderer, { IGNORE_LINE_WIDTH } from './renderer';
import { FiberProvider, useContextBridge } from 'its-fine';

export interface CanvasProps {
  width?: number;
  height?: number;
  /**
   * The **viewBox** attribute defines the position and dimension, in user space, of an Canvas viewport.
   * It is similar to the viewBox attribute of svg.  
   * 4 digits means [min-x, min-y, width, height]
   */
  viewBox?: [number, number, number, number];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const CanvasImpl: React.FC<CanvasProps> = ({
  width = 300,
  height = 150,
  viewBox = [],
  className,
  style,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const root = useRef<Root | null>(null);
  const rendererRef = useRef<Renderer>(null!);
  const [viewMinX = 0, viewMinY = 0, viewW = width, viewH = height] = viewBox;

  useEffect(() => {
    root.current = new Root({});

    const renderer = new Renderer(canvasRef.current, root.current, {});
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.stop();
      root.current?.unmount();
      root.current = null;
    }
  }, []);

  useEffect(() => {
    const { devicePixelRatio } = window;
    rendererRef.current.viewBox = [viewMinX, viewMinY, viewW, viewH]
  }, [viewMinX, viewMinY, viewW, viewH]);

  const ContextBridge = useContextBridge();

  const { devicePixelRatio } = window;

  useEffect(() => {
    root.current?.render(<ContextBridge>{children}</ContextBridge>);
  });

  return (
    <canvas
      style={{ ...style, width, height }}
      className={className}
      width={width * devicePixelRatio}
      height={height * devicePixelRatio}
      ref={canvasRef}
    />
  )
}

export const  Canvas: React.FC<CanvasProps> = (props) => {
  return (
    <FiberProvider>
      <CanvasImpl {...props} />
    </FiberProvider>
  )
}
