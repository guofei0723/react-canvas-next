import { CSSProperties } from 'react';

export type CellId = string;

export interface CellProps {
  fill?: CSSProperties['color']
}
export interface Cell<PropsType = CellProps> {
  id: CellId;
  type: string;
  props: PropsType;
}

export interface RectProps extends CellProps{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
export interface Rect extends Cell<RectProps> {
  type: 'rect',
}

export interface CellStore {
  cellIds: Array<CellId>;
  entities: Record<CellId, Cell>;
}

export class RendererModel {
  data: CellStore = {
    cellIds: [],
    entities: {},
  }

  addCell(cell: Cell) {
    const { cellIds, entities } = this.data;
    const nextCellsId = [...cellIds];
    const nextEntities = { ...entities };
  
    if (cellIds.includes(cell.id)) {
      console.warn(`added a cell with a duplicate id, the old one will be replaced.`, cell);
    } else {
      nextCellsId.push(cell.id);
    }

    nextEntities[cell.id] = cell;
    this.data = {
      cellIds: nextCellsId,
      entities: nextEntities,
    }
  }
}