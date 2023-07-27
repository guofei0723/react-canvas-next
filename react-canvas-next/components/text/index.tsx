import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'

export interface TextProps extends Omit<CellPropsBase, 'children'> {
  text: string;
  font?: string;
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
  direction?: 'ltr' | 'rtl' | 'inherit'
  maxWidth?: number;
  // asClip?: boolean;
}

export const TEXT_TYPE = 'text';

export interface TextModel extends CellModel<TextProps> {
  type: typeof TEXT_TYPE,
}

export const Text: FC<TextProps> = ({
  font = '10px sans-serif',
  textAlign = 'start',
  textBaseline = 'ideographic',
  direction = 'inherit',
  ...props
}) => {
  const fontStyle = {
    font,
    textAlign,
    textBaseline,
    direction,
  };
  return (
    <Cell {...props} {...fontStyle} type={TEXT_TYPE} />
  )
};