import { RectProps } from '../components';
import { CellId } from '../components/base';
import { CellStore } from '../core/react-renderer/model';
import Root from '../core/react-renderer/root';

const IGNORE_LINE_WIDTH = 20190822;

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private _rafId: number = 0;
  // 上一次渲染的数据
  private _prevData: CellStore | null = null;

  constructor(public canvas: HTMLCanvasElement, public root: Root,  private options: any) {
    this.ctx = canvas.getContext('2d')!;
  }

  /**
   * 循环
   */
  private loop = () => {
    this.render();
    this._rafId = requestAnimationFrame(this.loop);
  }

  /**
   * 渲染
   */
  private render() {
    const needRepaint = this._prevData !== this.root.data;
    this._prevData = this.root.data;

    if (needRepaint && this.root.data) {
      this.paintCells(this.root.data.cellIds);
    }

  }

  /**
   * 递归渲染每个元素
   */
  private paintCells(cellIds: Array<CellId>) {
    const { entities } = this.root.data;
    const { ctx } = this;

    cellIds.forEach((id) => {
      const { type, props, children } = entities[id];
      console.log('pating:', entities[id])

      ctx.save();
      
      // 基础设置，位置、旋转、缩放，颜色，边
      const { x = 0, y = 0, fill, stroke, lineWidth } = props;
      ctx.translate(x, y);
      if (fill) {
        ctx.fillStyle = fill;
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
      }
      if (typeof lineWidth === 'number') {
        ctx.lineWidth = lineWidth === 0 ? IGNORE_LINE_WIDTH : lineWidth;
      }

      // 按类型渲染
      if (type === 'rect') {
        const { width = 100, height = 60 } = props;
        ctx.fillRect(0, 0, width, height);

        if (ctx.lineWidth < IGNORE_LINE_WIDTH) {
          ctx.strokeRect(0, 0, width, height);
        }
      }

      if (children.length > 0) {
        this.paintCells(children)
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
