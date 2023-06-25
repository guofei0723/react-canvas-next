import { ArcModel } from './arc';
import { ArcToModel } from './arc-to';
import { BezierCurveModel } from './bezier-curve';
import { CircleModel } from './circle';
import { ClipPathModel } from './clippath';
import { EllipseModel } from './ellipse';
import { GroupModel } from './group';
import { PathModel } from './path';
import { QuadraticCurveModel } from './quadratic-curve';
import { RectModel } from './rect';


export type ShapeModels = RectModel
  | GroupModel
  | CircleModel
  | ClipPathModel
  | PathModel
  | ArcModel
  | EllipseModel
  | ArcToModel
  | BezierCurveModel
  | QuadraticCurveModel
  ;
