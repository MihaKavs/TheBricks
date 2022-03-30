function creddit() {
  Swal.fire({
    title: 'Project made Miha Kavs',
    confirmButtonText: 'Okej',
    color: '#000000',
    confirmButtonColor: '#000000',
  })
}

function drawIt() {
  var x = 300;
  var y = 300;
  var dx = 2;
  var dy = 4;
  var WIDTH = 800;
  var HEIGHT = 800;
  var r = 10;
  var ctx;
  
  function init() {
    ctx = $('#canvas')[0].getContext("2d");
    document.getElementById("center").style.width = "60%";
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    tocke = 0;
    $("#tocke").html("Points: " + tocke);
    sekunde = 0;
    izpisTimer = "00:00";
    intTimer = setInterval(timer, 1000);
    return interval = setInterval(draw, 10);
  }
  function circle(x, y, r) {
    ctx.fillStyle = "#55D1EA";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }
  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  function draw() {
    clear();
    circle(x, y, 10);
    //premik ploščice levo in desno
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
    rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);
    for (i = 0; i < NROWS; i++) {
      for (j = 0; j < NCOLS; j++) {
        if (i == 0) {
          if(bricks[i][j] != 0){
            rect((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT + PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT);
            //if(j ==  Math.floor(NCOLS/2))
              //ctx.drawImage(keg,j*BRICKWIDTH,i * BRICKHEIGHT ,BRICKWIDTH,BRICKHEIGHT);
            //else
             // ctx.drawImage(beer,j*BRICKWIDTH,i * BRICKHEIGHT ,BRICKWIDTH,BRICKHEIGHT);
          }
            
        }
		    if (i == 1) {
          if(bricks[i][j] != 0)
            //ctx.drawImage(coctail,j*BRICKWIDTH,i * BRICKHEIGHT ,BRICKWIDTH,BRICKHEIGHT);
          rect((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT + PADDING)) + PADDING,
          BRICKWIDTH, BRICKHEIGHT);
        }
        if(i == 2){
		      if (bricks[i][j] != 0) 
           // ctx.drawImage(wine,j*BRICKWIDTH,i * BRICKHEIGHT ,BRICKWIDTH,BRICKHEIGHT);
          rect((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT + PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT);
        }
      }
    }
    rowheight = BRICKHEIGHT  + r / 2; //Smo zadeli opeko?
    colwidth = BRICKWIDTH  + r / 2;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] != 0) {
      dy = -dy; bricks[row][col] -= 1;
      if(bricks[row][col] == 0){
        if(row == 2)
          tocke += 5;
        else if(row == 1)
          tocke += 10;
        else
          tocke += 15;
      }
   //v primeru, da imajo opeko večjo utež lahko prištevate tudi npr. 2 ali 3; pred tem bi bilo smiselno dodati še kakšen pogoj, ki bi signaliziral mesta opek, ki imajo višjo vrednost
      $("#tocke").html("Points: " + tocke);
    }
    if (x + dx > WIDTH - r || x + dx < 0 + r)
      dx = -dx;
    if (y + dy < 0 + r)
      dy = -dy;
    else if (y + dy > HEIGHT -paddleh/2 - r) {
      if (x > paddlex && x < paddlex + paddlew) {
        dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
      }
      else if (y + dy > HEIGHT - r) {
        clearInterval(intTimer);
        clearInterval(interval);
      }

    }
    x += dx;
    y += dy;
  }
  init();
  init_paddle();
  init_mouse();
  initbricks();
  function init_paddle() {
    paddlex = WIDTH / 2;
    paddleh = 20;
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

  $("#cas").html(izpisTimer);
}
var keg = new Image();
keg.src = "img/keg.png";
var coctail = new Image();
coctail.src = "img/cocktail.png";
var beer = new Image();
beer.src = "img/beer.png";
var wine = new Image();
wine.src = "img/wine.png";
var paddlex;
var paddleh;
var paddlew;
var canvasMinX;
var canvasMaxX;
var tocke;
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;
var start = true;

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
function initbricks() {
  WIDTH = $("#canvas").width();
  NROWS = 3;
  NCOLS = 15;
  BRICKWIDTH = (WIDTH / NCOLS) ;
  BRICKHEIGHT = 20;
  PADDING = 1;
  bricks = new Array(NROWS);
  console.log(Math.floor(NCOLS/2));
  for (i = 0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j = 0; j < NCOLS; j++) {
	  if(i == 0){
      if(j ==  Math.floor(NCOLS/2)){
		    bricks[i][j] = 5;
        console.log("ja");
      }
      else
        bricks[i][j] = 3;
    }
	  else if(i == 1)
		bricks[i][j] = 2;
	else 
		bricks[i][j] = 1;
    }
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
