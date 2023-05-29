import { Cell, CellId, CellStore, RectProps } from '../core/react-renderer/model';
import Root from "../core/react-renderer/root";

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private _rafId: number = 0;
  // 上一次渲染的数据
  private _prevData: CellStore | null = null;

  constructor(private canvas: HTMLCanvasElement, public root: Root,  private options: any) {
    this.ctx = canvas.getContext('2d')!;
  }

  private loop = () => {
    this.render();
    this._rafId = requestAnimationFrame(this.loop);
  }

  private render() {
    const needRepaint = this._prevData !== this.root.data;
    this._prevData = this.root.data;

    if (needRepaint && this.root.data) {
      this.paintCells(this.root.data.cellIds);
    }

  }

  private paintCells(cellIds: Array<CellId>) {
    const { entities } = this.root.data;
    const { ctx } = this;

    cellIds.forEach((id) => {
      const { type, props } = entities[id];
      console.log('pating:', entities[id])

      ctx.save();
      
      if (type === 'rect') {
        const { x = 0, y = 0, width = 100, height = 60, fill = 'red' } = props as RectProps;
        ctx.fillStyle = fill;
        ctx.fillRect(x, y, width, height);
      }
      ctx.restore();
    })
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
