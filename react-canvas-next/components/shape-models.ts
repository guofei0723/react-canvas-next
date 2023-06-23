import { ArcModel } from './arc';
import { ArcToModel } from './arc-to';
import { CircleModel } from './circle';
import { ClipPathModel } from './clippath';
import { EllipseModel } from './ellipse';
import { GroupModel } from './group';
import { PathModel } from './path';
import { RectModel } from './rect';


export type ShapeModels = RectModel
  | GroupModel
  | CircleModel
  | ClipPathModel
  | PathModel
  | ArcModel
  | EllipseModel
  | ArcToModel
  ;
