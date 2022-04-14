function creddit() {
  Swal.fire({
    title: 'Made Miha Kavs',
    confirmButtonText: 'Okej',
    text: 'This game was made for a school project.',
    color: '#000000',
    confirmButtonColor: '#000000',
  })
}
function restart() {
  document.getElementById("restart").style.display = "none";
  countDown = setInterval(countdown, 10);
}
function countdown() {
  if (tocke == 0) {
    sekunde = 0;
    $("#tocke").html("Points: " + "<br/>" + tocke);
    clearInterval(countDown);
    initbricks();
    x = 400;
    y = 400;
    dx = 2;
    dy = 4;
    draw();
    intTimer = setInterval(timer, 2000);
    setTimeout(() => { interval = setInterval(draw, 10) }, 1000);
    tocke++;
  }
  tocke--;
  $("#tocke").html("Points: " + "<br/>" + tocke);
  sliderHeight();
}
function lose() {
  Swal.fire({
    allowOutsideClick: false,

    title: 'Uh oh you lost!!' + '<br/>' + 'You got: ' + tocke + ' points' + '<br/>' + 'Time: ' + izpisTimer,
    confirmButtonText: 'Restart',
    showDenyButton: true,
    denyButtonText: 'Ok',
    color: '#000000',
    confirmButtonColor: '#000000',
  }).then((result) => {
    if (result.isConfirmed) {
      x = 400;
      y = 400;
      dx = 2;
      dy = 4;
      ctx.globalAlpha = 0.1;
      countDown = setInterval(countdown, 10);
    } else if (result.isDenied) {
      document.getElementById("restart").style.display = "block";
    }
  })
}
function win() {
  clearInterval(intTimer);
  clearInterval(interval);
  var ctx;
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  circle(x, y, 10);
  Swal.fire({
    title: 'Congratulations you won!!' + '<br/>' + 'You got: ' + tocke + ' points' + '<br/>' + 'Time: ' + izpisTimer,
    confirmButtonText: 'Restart',
    color: '#000000',
    confirmButtonColor: '#000000',
  }).then((result) => {
    countDown = setInterval(countdown, 10);
  })
}
function init() {
  ctx = $('#canvas')[0].getContext("2d");
  document.getElementById("center").style.width = "63%";
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();

  tocke = 0;
  $("#tocke").html("Points: " + "<br/>" + tocke);
  sekunde = 0;
  izpisTimer = "00:00";
  intTimer = setInterval(timer, 1000);
  return interval = setInterval(draw, 10);
}
function circle(x, y, r) {
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#a60100";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
//Move the plate with your mouse or arrow buttons and break those bricks. Difrent types of bricks give different amount of points.
var countDown;
function draw() {
  clear();
  circle(x, y, 10);
  if (rightDown) {
    if ((paddlex + paddlew) < WIDTH) {
      paddlex += 5;
    } else {
      paddlex = WIDTH - paddlew;
    }
  }
  else if (leftDown) {
    if (paddlex > 0) {
      paddlex -= 5;
    } else {
      paddlex = 0;
    }
  }
  ctx.globalAlpha = 1;
  paddleDrunknes();
  ctx.drawImage(plate, paddlex, HEIGHT - paddleh, paddlew, paddleh);
  for (i = 0; i < NROWS; i++) {
    for (j = 0; j < NCOLS; j++) {
      if (i == 0) {
        if (bricks[i][j] > 0) {
          if (j == Math.floor(NCOLS / 2)) {
            if (bricks[i][j] == 5)
              ctx.globalAlpha = 1;
            else if (bricks[i][j] == 4)
              ctx.globalAlpha = 0.8;
            else if (bricks[i][j] == 3)
              ctx.globalAlpha = 0.6;
            else if (bricks[i][j] == 2)
              ctx.globalAlpha = 0.4;
            else
              ctx.globalAlpha = 0.2;
            ctx.drawImage(keg, j * BRICKWIDTH, i * BRICKHEIGHT, BRICKWIDTH, BRICKHEIGHT);
          } else {
            if (bricks[i][j] == 3)
              ctx.globalAlpha = 1;
            else if (bricks[i][j] == 2)
              ctx.globalAlpha = 0.66;
            else
              ctx.globalAlpha = 0.33;
            ctx.drawImage(beer, j * BRICKWIDTH, i * BRICKHEIGHT, BRICKWIDTH, BRICKHEIGHT);
          }
        }
      }
      if (i == 1) {
        if (bricks[i][j] > 0) {
          if (bricks[i][j] == 2)
            ctx.globalAlpha = 1;
          else if (bricks[i][j] == 1)
            ctx.globalAlpha = 0.5;
          ctx.drawImage(coctail, j * BRICKWIDTH, i * BRICKHEIGHT, BRICKWIDTH, BRICKHEIGHT);

        }
      }
      if (i == 2) {
        if (bricks[i][j] > 0){
          ctx.globalAlpha = 1;
          ctx.drawImage(wine, j * BRICKWIDTH, i * BRICKHEIGHT, BRICKWIDTH, BRICKHEIGHT);
        }
      }
    }
  }
  for (i = 0; i < NROWS; i++) {
    for (j = 0; j < NCOLS; j++) {
      if (y + (dy * 2) + r <= (BRICKHEIGHT * i) + BRICKHEIGHT && y >= BRICKHEIGHT * i && x >= BRICKWIDTH * j && x <= (BRICKWIDTH * j) + BRICKWIDTH && bricks[i][j] != 0) {
        dy = dy * (-1); bricks[i][j] -= 1;
        if (bricks[i][j] == 0) {
          if (i == 2)
            tocke += 5;
          else if (i == 1)
            tocke += 10;
          else if (i == 0 && j == Math.floor(NCOLS / 2))
            tocke += 50;
          else
            tocke += 15;
          sliderHeight();
          if (document.getElementById("slider").style.backgroundPositionY == "0%")
            win();
        }
        $("#tocke").html("Points: " + "<br/>" + tocke);
      } else if (x + dx + r >= BRICKWIDTH * j && x + dx + r <= (BRICKWIDTH * j) + BRICKWIDTH && y <= (BRICKHEIGHT * i) + BRICKHEIGHT - r && y >= BRICKHEIGHT * i - r && bricks[i][j] != 0) {
        dx = -dx; bricks[i][j] -= 1;
        if (bricks[i][j] == 0) {
          if (i == 2)
            tocke += 5;
          else if (i == 1)
            tocke += 10;
          else if (i == 0 && j == Math.floor(NCOLS / 2))
            tocke += 50;
          else
            tocke += 15;
          sliderHeight();
          if (document.getElementById("slider").style.backgroundPositionY == "0%")
            win();
        }
        $("#tocke").html("Points: " + "<br/>" + tocke);
      }
    }
  }
  if (x + dx > WIDTH - r || x + dx < 0 + r)
    dx = -dx;
  if (y + dy < 0 + r)
    dy = -dy;
  else if (y + dy > HEIGHT - paddleh / 2 - r) {
    if (x > paddlex && x < paddlex + paddlew) {
      dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
      dy = -dy;
    }
    else if (y + dy > HEIGHT - r) {
      lose();
      clearInterval(intTimer);
      clearInterval(interval);
    }
  }
  x += dx;
  y += dy;
}
function drawIt() {
  document.getElementById("restart").style.display = "none";
  init();
  init_paddle();
  init_mouse();
  initbricks();
  calculatePionts();
  function init_paddle() {
    paddlex = WIDTH / 2;
    paddleh = 30;
    paddlew = 120;
  }
  function init_mouse() {
    canvasMinX = $("#canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
  }
  function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
      paddlex = evt.pageX - canvasMinX - paddlew / 2;
    }
  }
  $(document).mousemove(onMouseMove);
}
function timer() {
  sekunde++;
  sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
  minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
  izpisTimer = minuteI + ":" + sekundeI;
  $("#cas").html("Time:<br/>" + izpisTimer);
}
var keg = new Image();
keg.src = "img/keg.png";
var coctail = new Image();
coctail.src = "img/cocktail.png";
var beer = new Image();
beer.src = "img/beer.png";
var wine = new Image();
wine.src = "img/wine.png";
var plate = new Image();
plate.src = "img/plate.png";
var paddlex;
var paddleh;
var paddlew;
var canvasMinX;
var canvasMaxX;
var tocke = 0;
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;
var start = true;
var maxPoints;
var remainingPoints;
var procentageOfPoints;
var drunkHeight;
var fixedPoints;
var fulDrunkHeight;
var x = 400;
var y = 400;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var r = 10;
var ctx;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
function initbricks() {
  WIDTH = $("#canvas").width();
  NROWS = 3;
  NCOLS = 8;
  BRICKWIDTH = (WIDTH / NCOLS) - 1;
  BRICKHEIGHT = 100;
  PADDING = 1;
  bricks = new Array(NROWS);
  console.log(Math.floor(NCOLS / 2));
  for (i = 0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j = 0; j < NCOLS; j++) {
      if (i == 0) {
        if (j == Math.floor(NCOLS / 2)) {
          bricks[i][j] = 5;
          console.log("ja");
        }
        else
          bricks[i][j] = 3;
      }
      else if (i == 1)
        bricks[i][j] = 2;
      else
        bricks[i][j] = 1;
    }
  }
}
function calculatePionts() {
  maxPoints = 50 + (NCOLS - 1) * 15 + NCOLS * 10 + NCOLS * 5;
}
function sliderHeight() {
  remainingPoints = maxPoints - tocke;
  procentageOfPoints = remainingPoints / maxPoints;
  fixedPoints = procentageOfPoints.toFixed(2);
  fixedPoints = 1 - fixedPoints;
  drunkHeight = fixedPoints * 200;
  fulDrunkHeight = drunkHeight.toFixed();
  fulDrunkHeight = 200 - fulDrunkHeight;
  document.getElementById("slider").style.backgroundPositionY = -fulDrunkHeight + "%";
}
var texts = document.getElementsByClassName("fontStyling");
var randomX;
function paddleDrunknes(){
  if(fixedPoints >= 0.1 && fixedPoints <0.25){
    randomX = Math.floor(Math.random()*3-1);
    for (let i = 0; i < 3; i++) 
      texts[i].style.left = randomX + "px";
    paddlex = paddlex + randomX;
  }else if(fixedPoints >= 0.25 && fixedPoints <0.5){
    randomX = Math.floor(Math.random()*5-2)
    paddlex = paddlex + randomX;
    for (let i = 0; i < 3; i++) 
      texts[i].style.left = randomX + "px";
  }else if(fixedPoints >= 0.5 && fixedPoints <0.75){
    randomX = Math.floor(Math.random()*15-7)
    paddlex = paddlex + randomX;
    for (let i = 0; i < 3; i++) 
      texts[i].style.left = randomX + "px";
  }else if(fixedPoints >= 0.75){
    randomX = Math.floor(Math.random()*25-12)
    paddlex = paddlex + randomX;
    for (let i = 0; i < 3; i++) 
      texts[i].style.left = randomX + "px";
  }
}
var rightDown = false;
var leftDown = false;
function onKeyDown(evt) {
  if (evt.keyCode == 39)
    rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}
function onKeyUp(evt) {
  if (evt.keyCode == 39)
    rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);