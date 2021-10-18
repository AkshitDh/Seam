var img = new Image();
var imgUrl;
function draw_init() {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  let reqHeight, reqWidth, reqId;
  let imgData, energyMap, lowestEnergySeam, pxToRemoveX, pxToRemoveY, size;

  img.src = 'images/birds.jpg';
  img.addEventListener(
    'load',
    async function () {
      canvas.width = img.width;
      canvas.height = img.height;
      await ctx.drawImage(img, 0, 0, img.width, img.height);
      imgData = await ctx.getImageData(0, 0, img.width, img.height);

      // console.log(imgData);
      imageMasking(canvas, ctx, imgData);

      $('.compress').on('click', async function () {
        var heightPercentage = document.getElementById('height').value;
        var widthPercentage = document.getElementById('width').value;
        var amplifyPercentage = document.getElementById('amplify').value;
        if (heightPercentage < 0) {
          alert('Height must be greater than 0.');
        } else if (widthPercentage < 0) {
          alert('Width must be greater than 0.');
        } else {
          reqWidth = Math.floor(img.width * widthPercentage / 100);
          reqHeight = Math.floor(img.height * heightPercentage / 100);

          // Scaling to Amplify Content

          if (amplifyPercentage) {
            img.height = img.height + img.height * (amplifyPercentage / 100);
            img.width = img.width + img.width * (amplifyPercentage / 100);
          }

          console.log('compress clicked!!');

          // await ctx.drawImage(img, 0, 0, img.width, img.height);

          // await ctx.drawImage(img,0, 0);
          // imgData = await ctx.getImageData(0, 0, img.width, img.height);
          size = {
            w: imgData.width,
            h: imgData.height,
          };
          if(reqHeight > size.h)
            canvas.height = reqHeight;
          if(reqWidth > size.w)
            canvas.width = reqWidth;
          // await ctx.drawImage(img, 0, 0, img.width, img.height);
          // imgData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
          changeSizeBySeamCarving();
        }
      });

      console.log('image load hui to hai');
    },
    false
  );
  function changeSizeBySeamCarving() {
    ctx.putImageData(imgData, 0, 0);

    if (size.w == reqWidth && size.h == reqHeight) {
      cancelAnimationFrame(reqId);
      return;
    }
    // Width Reduction
    if (size.w > reqWidth) {
      energyMap = calculateEnergyMap(imgData, size);
      lowestEnergySeam = findLowEnergySeamX(energyMap, size);
      lowestEnergySeam.forEach((seam) => {
        ctx.beginPath();
        ctx.fillStyle = '#0F0';
        ctx.fillRect(seam.x, seam.y, 1, 1);
        ctx.fill();
      });
      deleteSeamX(imgData, lowestEnergySeam, size);
      size.w -= 1;
    }else if(size.w < reqWidth){
        energyMap = calculateEnergyMap(imgData, size);
        lowestEnergySeam = findLowEnergySeamX(energyMap, size);
        lowestEnergySeam.forEach((seam) => {
          ctx.beginPath();
          ctx.fillStyle = '#0F0';
          ctx.fillRect(seam.x, seam.y, 1, 1);
          ctx.fill();
        });
        addSeamX(imgData, lowestEnergySeam, size);
        size.w += 1;
    }
    // Height Reduction
    if (size.h > reqHeight) {
      energyMap = calculateEnergyMap(imgData, size);
      lowestEnergySeam = findLowEnergySeamY(energyMap, size);
      lowestEnergySeam.forEach((seam) => {
        ctx.beginPath();
        ctx.fillStyle = '#0FF';
        ctx.fillRect(seam.x, seam.y, 1, 1);
        ctx.fill();
      });
      deleteSeamY(imgData, lowestEnergySeam, size);
      size.h -= 1;
    }else if(size.h < reqHeight){
        energyMap = calculateEnergyMap(imgData, size);
        lowestEnergySeam = findLowEnergySeamY(energyMap, size);
        lowestEnergySeam.forEach((seam) => {
          ctx.beginPath();
          ctx.fillStyle = '#0FF';
          ctx.fillRect(seam.x, seam.y, 1, 1);
          ctx.fill();
        });
        addSeamY(imgData, lowestEnergySeam, size);
        size.h += 1;
    }
    reqId = requestAnimationFrame(changeSizeBySeamCarving);
  }
}

draw_init();

$('#imageUpload').on('change', (event) => {
  var reader = new FileReader();
  reader.onload = function () {
    imgUrl = reader.result;
    // console.log(imgUrl);
    img.src = imgUrl;
  };
  reader.readAsDataURL(event.target.files[0]);
});
