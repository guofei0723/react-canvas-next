import { RectProps, ShapeModels } from '../../components';
import { CellId, CellProps } from '../../components/base';

export interface CellStore {
  cellIds: Array<CellId>;
  entities: Record<CellId, ShapeModels>;
}
