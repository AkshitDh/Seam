function setPixel(img, { x, y }, color) {
    const i = y * img.width + x;
    const cellsPerColor = 4; // RGBA
    img.data.set(color, i * cellsPerColor);
  }
  function addSeamX(img, seam, { w }) {
    seam.forEach(({ x: seamX, y: seamY }) => {
      for (let x = w - 1; x >= seamX; x -= 1) {
        const currPixel = getPixel(img, { x, y: seamY });
        setPixel(img, { x: x + 1, y: seamY }, currPixel);
      }
    });
  }
  function addSeamY(img, seam, { h }) {
    seam.forEach(({ x: seamX, y: seamY }) => {
      for (let y = h - 1; y >= seamY; y -= 1) {
        const currPixel = getPixel(img, { x: seamX, y });
        setPixel(img, { x: seamX, y: y + 1 }, currPixel);
      }
    });
  }
  