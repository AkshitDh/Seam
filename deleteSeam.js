function setPixel(img, { x, y }, color) {
  const i = y * img.width + x;
  const cellsPerColor = 4; // RGBA
  img.data.set(color, i * cellsPerColor);
}
function deleteSeamX(img, seam, { w }) {
  seam.forEach(({ x: seamX, y: seamY }) => {
    for (let x = seamX; x < w - 1; x += 1) {
      const nextPixel = getPixel(img, { x: x + 1, y: seamY });
      setPixel(img, { x, y: seamY }, nextPixel);
    }
    setPixel(img, { y: seamY, x: w - 1 }, [225, 225, 225, 1]);
  });
}
function deleteSeamY(img, seam, { h }) {
  seam.forEach(({ x: seamX, y: seamY }) => {
    for (let y = seamY; y < h - 1; y += 1) {
      const nextPixel = getPixel(img, { x: seamX, y: y + 1 });
      setPixel(img, { x: seamX, y }, nextPixel);
    }
    setPixel(img, { y: h - 1, x: seamX }, [225, 225, 225, 1]);
  });
}
