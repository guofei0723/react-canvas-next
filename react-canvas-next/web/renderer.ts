import Root from "../core/container/root";

export default class Renderer {
  private ctx: CanvasRenderingContext2D | null;
  private _rafId: number = 0;
  // 上一次渲染的数据
  private _prevData: any;

  constructor(private canvas: HTMLCanvasElement, public root: Root,  private options: any) {
    this.ctx = canvas.getContext('2d');
  }

  private loop = () => {
    this.render();
    this._rafId = requestAnimationFrame(this.loop);
  }

  private render() {
    const needRepaint = this._prevData !== this.root.data;

    if (needRepaint) {
      console.error('[web renderer]: not implement:', this.root.data);
    }

    this._prevData = this.root.data;
  }

  /**
   * 启动
   */
  start() {
    this.loop();
  }

  /**
   * 停止
   */
  stop() {
    cancelAnimationFrame(this._rafId);
  }
}
