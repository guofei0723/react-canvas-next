import { ArcModel } from './arc';
import { CircleModel } from './circle';
import { ClipPathModel } from './clippath';
import { GroupModel } from './group';
import { PathModel } from './path';
import { RectModel } from './rect';


export type ShapeModels = RectModel
  | GroupModel
  | CircleModel
  | ClipPathModel
  | PathModel
  | ArcModel
  ;
