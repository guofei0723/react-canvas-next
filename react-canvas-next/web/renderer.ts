import { ARC_TYPE, BEZIERCURVE_TYPE, ELLIPSE_TYPE, GROUP_TYPE, LINE_TYPE, PATH_TYPE, PathProps, QUADRATICCURVE_TYPE, RECT_TYPE, ShapeModels, TEXT_TYPE } from '../components';
import { ARCCURVE_TYPE } from '../components/arc-curve';
import { CellProps } from '../components/base';
import { CIRCLE_TYPE } from '../components/circle';
import { SUBPATH_TYPE } from '../components/path/sub-path';
import { POLYGON_TYPE } from '../components/polygon';
import { CellStore } from '../core/react-renderer/model';
import Root from '../core/react-renderer/root';

export const IGNORE_LINE_WIDTH = 20190822;

export type ViewBox = [number, number, number, number];
export type KeepAspectRatioType = boolean | 'meet' | 'slice';

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  // 上一次渲染的数据
  private _prevData: CellStore | null = null;
  private _prevSize: { w: number, h: number };
  private _viewBox: ViewBox;
  private _keepAspectRatioj: KeepAspectRatioType = false;
  private _subpathCount = 0;

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
    return this.ctx.strokeStyle !== 'transparent' && this.ctx.strokeStyle !== 'rgba(0, 0, 0, 0)' && this.ctx.lineWidth < IGNORE_LINE_WIDTH;
  }

  private shouldFillColor() {
    return this.ctx.fillStyle !== 'transparent' && this.ctx.fillStyle !== 'rgba(0, 0, 0, 0)';
  }

  /**
   * is now in subpath context
   */
  private inPathMode() {
    return this._subpathCount > 0;
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

    this.paintCells(this.root.data.cells);
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
  private paintCells(cells: Array<ShapeModels>) {
    // const { entities } = this.root.data;
    const { ctx } = this;

    cells.forEach((cell) => {
      const { type, props, children } = cell;

      ctx.save();
      
      // 基础设置，位置、旋转、缩放，颜色，边
      const { x = 0, y = 0, fillRule, close: closePath } = props as CellProps;

      // group translate
      if (type === GROUP_TYPE) {
        ctx.translate(x, y);
      }

      if (!this.inPathMode()) {
        const { fill, stroke, lineWidth } = props as CellProps;
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
      if (type !== GROUP_TYPE && ((props as CellProps).x !== undefined || (props as CellProps).y !== undefined)) {
        ctx.moveTo(x, y);
      }

      switch (type) {
        case RECT_TYPE: {
          const { width, height } = props;
          ctx.rect(x, y, width, height);
          break;
        }
        case CIRCLE_TYPE: {
          ctx.arc(props.cX, props.cY, props.r, 0, 2 * Math.PI);
          break;
        }
        case ARC_TYPE: {
          ctx.arc(props.cX, props.cY, props.r, props.startAngle, props.endAngle, props.counterclockwise);
          break;
        }
        case ELLIPSE_TYPE: {
          ctx.ellipse(props.cX, props.cY, props.rX, props.rY, props.rotation!, props.startAngle, props.endAngle, props.counterclockwise);
          break;
        }
        case ARCCURVE_TYPE: {
          ctx.arcTo(props.cp1X, props.cp1Y, props.cp2X, props.cp2Y, props.r);
          break;
        }
        case BEZIERCURVE_TYPE: {
          ctx.bezierCurveTo(props.cp1X, props.cp1Y, props.cp2X, props.cp2Y, props.endX, props.endY);
          break;
        }
        case QUADRATICCURVE_TYPE: {
          ctx.quadraticCurveTo(props.cpX, props.cpY, props.endX, props.endY);
          break;
        }
        case LINE_TYPE: {
          ctx.lineTo(props.endX, props.endY);
          break;
        }
        case POLYGON_TYPE: {
          const { points } = props;
          for (let i = 0; i < points.length; i+=2) {
            ctx.lineTo(points[i], points[i + 1] || 0);
          }
          break;
        }
        case TEXT_TYPE: {
          if (this.inPathMode()) {
            console.warn('Text components cannot be used as subpath of Path');
          }
          const { font, textAlign, textBaseline, direction } = props;
          ctx.font = font!;
          ctx.textAlign = textAlign!;
          ctx.textBaseline = textBaseline!;
          ctx.direction = direction!;

          // if (this.shouldFillColor()) {
          //   ctx.fillText(props.text, props.x || 0, props.y || 0, props.maxWidth);
          // }
          // if (this.shouldDrawStroke()) {
          //   ctx.strokeText(props.text, props.x || 0, props.y || 0, props.maxWidth);
          // }
          
          // if (props.asClip) {
          //   ctx.globalCompositeOperation = 'source-in';
          // }
          break;
        }
      }

      if (type === SUBPATH_TYPE) {
        // 记录剪切路径数量
        this._subpathCount += 1;
      }

      if (children.length > 0) {
        this.paintCells(children as ShapeModels[])
      }

      if (type === SUBPATH_TYPE) {
        this._subpathCount -= 1;
      }

      if (closePath) {
        ctx.closePath();
      }

      if (this.shouldPaintShape(type, props)) {
        // fill
        if (this.shouldFillColor()) {
          switch (type) {
            case TEXT_TYPE: {
              ctx.fillText(props.text, props.x || 0, props.y || 0, props.maxWidth);
              break;
            }

            default: {
              ctx.fill(fillRule);
            }
          }
        }
        // stroke
        if (this.shouldDrawStroke()) {
          switch (type) {
            case TEXT_TYPE: {
              ctx.strokeText(props.text, props.x || 0, props.y || 0, props.maxWidth);
              console.log('fill text:', props);
              break;
            }
            
            default: {
              ctx.stroke();
            }
          }
        }
      }

      ctx.restore();

      // as cliping path
      if (type === SUBPATH_TYPE && props.asClip) {
        ctx.clip(props.fillRule);
      }
    })
  }

  private shouldPaintShape(type: ShapeModels['type'], props: ShapeModels['props']) {
    return type !== GROUP_TYPE && type !== PATH_TYPE
      && !this.inPathMode()
      && !(props as PathProps).asClip
  }
}
