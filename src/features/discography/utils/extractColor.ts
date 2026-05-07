export const extractEdgeColors = (img: HTMLImageElement): [string, string] => {
  const { naturalWidth: w, naturalHeight: h } = img;
  if (!w || !h) return ["transparent", "transparent"];

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return ["transparent", "transparent"];

  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0);

  const sampleW = Math.max(1, Math.floor(w * 0.15));
  const pixelCount = sampleW * h;

  const avgRgb = (data: Uint8ClampedArray) => {
    let r = 0,
      g = 0,
      b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    return `rgb(${Math.round(r / pixelCount)},${Math.round(g / pixelCount)},${Math.round(b / pixelCount)})`;
  };

  const leftColor = avgRgb(ctx.getImageData(0, 0, sampleW, h).data);
  const rightColor = avgRgb(ctx.getImageData(w - sampleW, 0, sampleW, h).data);
  return [leftColor, rightColor];
};
