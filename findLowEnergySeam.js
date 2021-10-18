function findLowEnergySeamX(energyMap, size) {
  let seam = [];
  let ind = -1,
    minEnergy = 1000000000;
  for (let i = 1; i < size.h; i++) {
    for (let j = 0; j < size.w; j++) {
      let minPrev = energyMap[i - 1][j];
      if (j - 1 >= 0 && energyMap[i - 1][j - 1] < minPrev)
        minPrev = energyMap[i - 1][j - 1];
      if (j + 1 < size.w && energyMap[i - 1][j + 1] < minPrev)
        minPrev = energyMap[i - 1][j + 1];
      energyMap[i][j] += minPrev;
      if (i == size.h - 1 && energyMap[i][j] < minEnergy) {
        minEnergy = energyMap[i][j];
        ind = j;
      }
    }
  }
  seam.push({ y: size.h - 1, x: ind });
  for (let i = size.h - 1; i >= 1; i--) {
    minEnergy = Math.pow(10, 100);
    let j = -1;
    for (let dx = -1; dx <= 1; dx++) {
      if (
        ind + dx >= 0 &&
        ind + dx < size.w &&
        energyMap[i - 1][ind + dx] < minEnergy
      ) {
        minEnergy = energyMap[i - 1][ind + dx];
        j = ind + dx;
      }
    }
    ind = j;
    seam.push({ y: i - 1, x: ind });
  }
  return seam.reverse();
}
function findLowEnergySeamY(energyMap, size) {
  let seam = [];
  let ind = -1,
    minEnergy = 1000000000;
  for (let i = 1; i < size.w; i++) {
    for (let j = 0; j < size.h; j++) {
      // j -> rows  , i -> cols
      let minPrev = energyMap[j][i - 1];
      if (j - 1 >= 0 && energyMap[j - 1][i - 1] < minPrev)
        minPrev = energyMap[j - 1][i - 1];
      if (j + 1 < size.h && energyMap[j + 1][i - 1] < minPrev)
        minPrev = energyMap[j + 1][i - 1];
      energyMap[j][i] += minPrev;
      if (i == size.w - 1 && energyMap[j][i] < minEnergy) {
        minEnergy = energyMap[j][i];
        ind = j;
      }
    }
  }
  seam.push({ y: ind, x: size.w - 1 });
  for (let i = size.w - 1; i >= 1; i--) {
    minEnergy = Math.pow(10, 100);
    let j = -1;
    for (let dx = -1; dx <= 1; dx++) {
      if (
        ind + dx >= 0 &&
        ind + dx < size.h &&
        energyMap[ind + dx][i - 1] < minEnergy
      ) {
        minEnergy = energyMap[ind + dx][i - 1];
        j = ind + dx;
      }
    }
    ind = j;
    seam.push({ y: ind, x: i - 1 });
  }
  return seam.reverse();
}
