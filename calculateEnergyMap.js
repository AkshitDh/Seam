function calculateEnergyMap(img, size) {
  let energyMap = [];
  for (let i = 0; i < size.h; i++) {
    let energyRow = [];
    for (let j = 0; j < size.w; j++) {
      let left = j - 1 >= 0 ? getPixel(img, { y: i, x: j - 1 }) : null;
      let mid = getPixel(img, { y: i, x: j });
      let right = j + 1 < size.w ? getPixel(img, { y: i, x: j + 1 }) : null;
      energyRow.push(getPixelEnergy(left, mid, right));
    }
    energyMap.push(energyRow);
  }
  return energyMap;
}
function getPixelEnergy(left, mid, right) {
  const [mR, mG, mB, mA] = mid;
  if (mA === 0) {
    return -100000;
  }
  let lEnergy = 0,
    rEnergy = 0;
  if (left) {
    const [lR, lG, lB] = left;
    lEnergy = (lR - mR) ** 2 + (lG - mG) ** 2 + (lB - mB) ** 2;
  }
  if (right) {
    const [rR, rG, rB] = right;
    rEnergy = (rR - mR) ** 2 + (rG - mG) ** 2 + (rB - mB) ** 2;
  }
  return Math.sqrt(lEnergy + rEnergy);
}
function getPixel(img, { x, y }) {
  const i = y * img.width + x;
  const cellsPerColor = 4; // RGBA
  return img.data.subarray(
    i * cellsPerColor,
    i * cellsPerColor + cellsPerColor
  );
}
