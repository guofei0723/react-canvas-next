import { FC, useEffect, useState } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'
import { PointLike, PointProp, Rectangle, Size } from '../../utils/math';

export interface ImageCellProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  sX?: number;
  sY?: number;
  sWidth?: number;
  sHeight?: number;
  imgObj: any;
}

export const IMAGE_TYPE = 'image';

export interface ImageModel extends CellModel<ImageCellProps> {
  type: typeof IMAGE_TYPE,
}

export interface ImageProps {
  source?: Rectangle;
  dest: PointLike & Partial<Size>;
  src?: string;
  /**
   * image object, will ignore src
   */
  img?: any;
}

export const Image: FC<ImageProps> = ({
  source,
  dest,
  src,
  img: sourceImg = null,
}) => {
  const [imgObj, setImgObj] = useState<any>(sourceImg);

  useEffect(() => {
    if (sourceImg) {
      setImgObj(sourceImg);
    } else if (src) {
      // in browser
      if (typeof document !== 'undefined') {
        const img = document.createElement('img');
        img.onload = () => {
          setImgObj(img);
        };
        img.src = src;
      }
    }
  }, [src, sourceImg]);

  const imgWidth = imgObj?.width || 1;
  const imgHeight = imgObj?.height || 1;

  const { width: dw, height: dh } = dest;
  const sw = source?.width || imgWidth || 1;
  const sh = source?.height || imgHeight || 1;
  const ratio = sw / sh;
  const width = dw || (dh || sh) * ratio;
  const height = dh || (dw || sw) / ratio;

  return (
    <CELL_TAG
      {...dest}
      width={width}
      height={height}
      sX={source?.x}
      sY={source?.y}
      sWidth={sw}
      sHeight={sh}
      imgObj={imgObj}
      type={IMAGE_TYPE}
    />
  )
};
