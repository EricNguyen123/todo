import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const iconToSvg = (Icon: any, width: number = 18, height: number = 18): string => {
  const svgString = renderToStaticMarkup(createElement(Icon, { style: { fontSize: `${width}px`, height: `${height}px`, width: `${width}px` } }));
  return svgString;
};

export default iconToSvg;
