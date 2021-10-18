function imageMasking(canvas, ctx, imgData) {
  $('.pen').on('click', function () {
    let marked = [];
    marked.length = canvas.height + 50;
    for (let i = 0; i < marked.length; i++) {
      let row = [];
      row.length = canvas.width + 50;
      for (let j = 0; j < row.length; j++) row[j] = 0;
      marked[i] = row;
    }
    // console.log(marked);
    var flag = false,
      prevX = 0,
      currX = 0,
      prevY = 0,
      currY = 0,
      dot_flag = false;
    var x = 'black',
      y = 8;

    function init() {
      // w = canvas.width;
      // h = canvas.height;
      canvas.addEventListener(
        'mousemove',
        function (e) {
          findxy('move', e);
        },
        false
      );
      canvas.addEventListener(
        'mousedown',
        function (e) {
          findxy('down', e);
        },
        false
      );
      canvas.addEventListener(
        'mouseup',
        function (e) {
          findxy('up', e);
        },
        false
      );
      canvas.addEventListener(
        'mouseout',
        function (e) {
          findxy('out', e);
        },
        false
      );
    }
    function draw() {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = x;
      ctx.lineWidth = y;
      ctx.stroke();
      ctx.closePath();
    }
    // function erase() {
    //   var m = confirm("Want to clear");
    //   if (m) {
    //       ctx.clearRect(0, 0, w, h);
    //       document.getElementById("canvasimg").style.display = "none";
    //   }
    // }
    function findxy(res, e) {
      var rect = canvas.getBoundingClientRect();
      if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - rect.left;
        currY = e.clientY - rect.top;

        for (let i = currY; i < currY + y; i++) {
          for (let j = currX; j < currX + y; j++) {
            if (i < canvas.height && j < canvas.width) {
              marked[i][j] = 1;
              let idx = (i - 1) * img.width + j;
              let color = [255, 0, 0, 0];
              imgData.data.set(color, idx * 4);
            }
          }
        }
        flag = true;
        dot_flag = true;
        if (dot_flag) {
          ctx.beginPath();
          ctx.fillStyle = x;
          ctx.fillRect(currX, currY, y, y);
          ctx.closePath();
          dot_flag = false;
        }
      }
      if (res == 'up' || res == 'out') {
        flag = false;
      }
      if (res == 'move') {
        if (flag) {
          prevX = currX;
          prevY = currY;
          currX = e.clientX - rect.left;
          currY = e.clientY - rect.top;

          for (let i = currY; i < currY + y; i++) {
            for (let j = currX; j < currX + y; j++) {
              if (i < canvas.height && j < canvas.width) {
                marked[i][j] = 1;
                let idx = (i - 1) * img.width + j;
                let color = [255, 0, 0, 0];
                imgData.data.set(color, idx * 4);
              }
            }
          }

          draw();
        }
      }
    }
    init();
  });
}
