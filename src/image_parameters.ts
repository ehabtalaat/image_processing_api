interface ImageParameter {
  filename?: string;
  width?: string;
  height?: string;
}

interface resizeParams {
  src: string;
  target: string;
  width: number;
  height: number;
}

export { ImageParameter, resizeParams };
