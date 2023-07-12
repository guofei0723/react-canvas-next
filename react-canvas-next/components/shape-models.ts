import { ArcModel } from './arc';
import { ArcCurveModel } from './arc-curve';
import { BezierCurveModel } from './bezier-curve';
import { CircleModel } from './circle';
// import { ClipPathModel } from './clippath';
import { EllipseModel } from './ellipse';
import { GroupModel } from './group';
import { LineModel } from './line';
import { PathModel } from './path';
import { PolygonModel } from './polygon';
import { QuadraticCurveModel } from './quadratic-curve';
import { RectModel } from './rect';


export type ShapeModels = RectModel
  | GroupModel
  | CircleModel
  // | ClipPathModel
  | PathModel
  | ArcModel
  | EllipseModel
  | ArcCurveModel
  | BezierCurveModel
  | QuadraticCurveModel
  | LineModel
  | PolygonModel
  ;
