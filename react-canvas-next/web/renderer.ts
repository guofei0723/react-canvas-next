import { ARC_TYPE, BEZIERCURVE_TYPE, ELLIPSE_TYPE, GROUP_TYPE, PATH_TYPE, PathProps, RECT_TYPE, ShapeModels } from '../components';
import { ARCTO_TYPE } from '../components/arc-to';
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
  private _clipPathCount = 0;
  private _pathCount = 0;

  constructor(private canvas: HTMLCanvasElement, public root: Root,  private options: any) {
    this.ctx = canvas.getContext('2d')!;
    this._prevSize = {
      w: canvas.width,
      h: canvas.height,
    };
    this._viewBox = [0, 0, canvas.width, canvas.height];
    // 更新回调
    this.root.onUpdate = () => this.render();
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
  public render() {
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

  private shouldFillColor() {
    return this.ctx.fillStyle !== 'transparent';
  }

  /**
   * is now in clipPath region
   */
  private inClipPath() {
    return this._clipPathCount > 0;
  }

  /**
   * is now in path or clipPath region
   */
  private inPathMode() {
    return this._clipPathCount > 0 || this._pathCount > 0;
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
    ctx.fillStyle = 'transparent';

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
      const { x = 0, y = 0, fillRule } = props;

      // group translate
      if (type === GROUP_TYPE) {
        ctx.translate(x, y);
      }

      // /**
      //  * 当前在路径内部时无需不能再开始新路径
      //  */
      // if (!this.inPathMode()) {
      //   ctx.beginPath();
      // }

      if (!this.inPathMode()) {
        const { fill, stroke, lineWidth } = props;
        if (fill) {
          ctx.fillStyle = fill;
        }

        if (stroke) {
          ctx.strokeStyle = stroke;
        }

        if (typeof lineWidth === 'number') {
          ctx.lineWidth = (lineWidth <= 0 || lineWidth === Infinity || isNaN(lineWidth)) ? IGNORE_LINE_WIDTH : lineWidth;
        }

        ctx.beginPath();
      }

      // call moveTo(), begin a new sub-path
      if (type !== GROUP_TYPE && (props.x !== undefined || props.y !== undefined)) {
        ctx.moveTo(x, y);
      }

      switch (type) {
        case RECT_TYPE: {
          const { width, height } = props;
          ctx.rect(x, y, width, height);
          break;
        }
        case CIRCLE_TYPE: {
          ctx.arc(props.cx, props.cy, props.r, 0, 2 * Math.PI);
          break;
        }
        case ARC_TYPE: {
          ctx.arc(props.cx, props.cy, props.r, props.startAngle, props.endAngle, props.counterclockwise);
          break;
        }
        case ELLIPSE_TYPE: {
          ctx.ellipse(props.cx, props.cy, props.rx, props.ry, props.rotation!, props.startAngle, props.endAngle, props.counterclockwise);
          break;
        }
        case ARCTO_TYPE: {
          ctx.arcTo(props.x1, props.y1, props.x2, props.y2, props.r);
          break;
        }
        case BEZIERCURVE_TYPE: {
          ctx.bezierCurveTo(props.cp1x, props.cp1y, props.cp2x, props.cp2y, props.endx, props.endy);
          break;
        }
      }

      if (type === PATH_TYPE) {
        // 记录剪切路径数量
        this._pathCount += 1;
      }

      if (children.length > 0) {
        this.paintCells(children)
      }

      if (type === PATH_TYPE) {
        this._pathCount -= 1;
      }

      if (props.close) {
        ctx.closePath();
      }

      if (this.shouldPaintShape(type, props)) {
        if (this.shouldFillColor()) {
          ctx.fill(fillRule);
        }
        if (this.shouldDrawStroke()) {
          ctx.stroke();
        }
      }

      ctx.restore();

      // as cliping path
      if (type === PATH_TYPE && props.asClip) {
        ctx.clip(props.fillRule);
      }
    })
  }

  private shouldPaintShape(type: ShapeModels['type'], props: ShapeModels['props']) {
    return type !== GROUP_TYPE && !this.inPathMode() && !(props as PathProps).asClip
  }

  // /**
  //  * 启动
  //  */
  // start() {
  //   this.loop();
  // }

  // /**
  //  * 停止
  //  */
  // stop() {
  //   cancelAnimationFrame(this._rafId);
  // }
}
