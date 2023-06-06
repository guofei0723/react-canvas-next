import { RectProps } from '../components';
import { CellId } from '../components/base';
import { CIRCLE_TYPE } from '../components/circle';
import { CellStore } from '../core/react-renderer/model';
import Root from '../core/react-renderer/root';

export const IGNORE_LINE_WIDTH = 20190822;

export type ViewBox = [number, number, number, number];
export type KeepAspectRatioType = boolean | 'meet' | 'slice';

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private _rafId: number = 0;
  // 上一次渲染的数据
  private _prevData: CellStore | null = null;
  private _prevSize: { w: number, h: number };
  private _viewBox: ViewBox;
  private _keepAspectRatioj: KeepAspectRatioType = false;

  constructor(private canvas: HTMLCanvasElement, public root: Root,  private options: any) {
    this.ctx = canvas.getContext('2d')!;
    this._prevSize = {
      w: canvas.width,
      h: canvas.height,
    };
    this._viewBox = [0, 0, canvas.width, canvas.height];
  }

  get viewBox() {
    return this._viewBox;
  }

  set viewBox(value: [number, number, number, number]) {
    this._viewBox = value;
  }

  public updateViewBox(box: ViewBox, ratioType: KeepAspectRatioType) {
    this.viewBox = box;
    this._keepAspectRatioj = ratioType;
  }

  /**
   * Determine whether the size has changed
   */
  private sizeChanges() {
    const { w: prevW, h: prevH } = this._prevSize;
    return prevW !== this.canvas.width || prevH !== this.canvas.height;
  }

  private updateDimension() {
    const { ctx, _keepAspectRatioj: ratioType } = this;
    const { width, height } = this.canvas;
    const [viewMinX, viewMinY, viewW, viewH] = this._viewBox;

    const xScale = width / viewW;
    const yScale = height / viewH;

    if (!ratioType) {
      ctx.scale(xScale, yScale);
    } else {
      let finalScale: number;

      switch (ratioType) {
        case 'meet': {
          finalScale = Math.min(xScale, yScale);
          break;
        }
        case 'slice': {
          finalScale = Math.max(xScale, yScale);
          break;
        }

        default: {
          finalScale = Math.min(xScale, yScale);
        }
      }

      ctx.scale(finalScale, finalScale);
      const offX = (width / finalScale - viewW) / 2;
      const offY = (height / finalScale - viewH) / 2;
      ctx.translate(offX, offY);
    }

    ctx.translate(-viewMinX, -viewMinY);

    ctx.beginPath();
    ctx.rect(viewMinX, viewMinY, viewW, viewH);
    ctx.clip();
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
    const sizeChanged = this.sizeChanges();
    if (sizeChanged) {
      this._prevSize = {
        w: this.canvas.width,
        h: this.canvas.height,
      };
    }
    const needRepaint = this._prevData !== this.root.data || sizeChanged;
    this._prevData = this.root.data;

    if (needRepaint && this.root.data) {
      this.draw();
    }
  }

  private shouldDrawStroke() {
    return this.ctx.strokeStyle !== 'transparent' && this.ctx.lineWidth < IGNORE_LINE_WIDTH;
  }

  /**
   * draw content
   */
  private draw() {
    const { ctx } = this;
    
    ctx.save();
    this.clear();
    this.updateDimension();
    // disable stroke by default
    ctx.strokeStyle = 'transparent';

    this.paintCells(this.root.data.cellIds);
    ctx.restore();
  }
  
  private clear() {
    this.ctx.save();
    this.ctx.setTransform(1,0,0,1,0,0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();
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
        ctx.lineWidth = (lineWidth <= 0 || lineWidth === Infinity || isNaN(lineWidth)) ? IGNORE_LINE_WIDTH : lineWidth;
      }

      // 按类型渲染
      if (type === 'rect') {
        const { width = 100, height = 60 } = props;
        ctx.fillRect(0, 0, width, height);

        if (this.shouldDrawStroke()) {
          ctx.strokeRect(0, 0, width, height);
        }
      }

      if (type === CIRCLE_TYPE) {
        console.log('draw circle:', props);
        ctx.beginPath();
        ctx.arc(0, 0, props.r, 0, 2 * Math.PI);
        ctx.fill();

        if (this.shouldDrawStroke()) {
          ctx.stroke();
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
