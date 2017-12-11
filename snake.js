//settings
var snakeX = 2;
var snakeY = 2;
var height = 30;
var width = 30;
var interval = 100; // 1/10 of a second = time that itll take for the snake to update
var increment = 2;

//game variables
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY; //fX and fY are the fruit / coin variables
var running = false;
var gameOver = false;
var direction = -1; // up = 0 | down = -1 | left = 1 | right = 2
var int;
var displayText;
var score = 0;

fruitEat = new Audio('fruitEat.mp3');
gameOverSound = new Audio('gameOver.mp3');
gameOverSound.hasPlayed = false;

bgMusic = new Audio('snakeBGMusic.mp3');
bgMusic.play();
bgMusic.loop = true;


var refresh = document.getElementById("refresh-button");
refresh.addEventListener("click",function(){

window.location = window.location;


});

//entry point of game

function run(){

init();
int = setInterval(gameLoop, interval);

}

function init (){

createMap();
createSnake();
createFruit();

}
// generates the map for the snakeX

function createMap(){

document.write("<table>");

for (var y = 0 ; y < height ; y++){

document.write("<tr>");

for (var x = 0; x < width ; x++){

  if (x == 0 || x == width -1 || y == 0 || y == height - 1){

      document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");

  } else{
    document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
  }

}

document.write("</tr>");

}

document.write("</table>");


}




function createSnake(){
   set(snakeX, snakeY, "snake");
}

function get(x,y){
   return document.getElementById(x+"-"+y);
}

function set(x,y,value){
   if(x != null && y != null)
       get(x,y).setAttribute("class", value);
}

function rand(min,max){
   return Math.floor(Math.random() * (max - min) + min);
}

function getType(x,y){
   return get(x,y).getAttribute("class");
}

function createFruit(){
   var found = false;
   while(!found && (length < (width-2)*(height-2)+1)){
       var fruitX = rand(1,width-1);
       var fruitY = rand(1,height-1);
       if(getType(fruitX, fruitY) == "blank")
           found = true;
   }
   set(fruitX, fruitY, "fruit");
   fX = fruitX;
   fY = fruitY;
}


window.addEventListener("keypress",function key(){

  var key = event.keyCode;
      if(direction != -1 && (key == 119 || key == 87)){
          tempdir = 0;
          }
      //if key is S set direction down
      else if(direction != 0 && (key == 115 || key == 83)){
          tempdir = -1;
          }
      //if key is A set direction left
      else if(direction != 2 && (key == 97 || key == 65)){
          tempdir = 1;
          }
      //if key is D set direction right
      else if(direction != 1 && (key == 100 || key == 68)){
          tempdir = 2;

        }

      if(!running){
          running = true;

        }
      else if(key == 32){
            running = false;
          }

});

function update(){
    direction = tempdir;
    //prevents fruit from not showing up
    set(fX, fY, "fruit");
    //update the tail
    updateTail();
    //sets the last segment of the tail to blank  before moving the snake
    set(tailX[length], tailY[length], "blank");
    //updates the position of the snake according to the direction
    if(direction == 0)
        snakeY--;
    else if(direction == -1)
        snakeY++;
    else if(direction == 1)
        snakeX--;
    else if(direction == 2)
        snakeX++;
    //draws the head of the snake on the tail
    set(snakeX, snakeY, "snake");

    for(var i = tailX.length-1; i>=0; i--){

        if(snakeX == tailX[i] && snakeY == tailY[i]){

          gameOver = true;
          break;
        }

    }





    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) {
       gameOver = true;
      }
      else if(snakeX == fX && snakeY == fY){
       //adds 4 to the score
       fruitEat.play();
       score+=2;
       //creates new fruit, which automatically replaces the old one
       createFruit();
       //adds the set increment to the length of the snake making it longer
       length+=increment;
   }
   //set
   document.getElementById("score").innerHTML = "Score: " + score;

}

function gameLoop(){

  if (running && !gameOver){

    update();

  } else if (gameOver){

    clearInterval(init);
    if (gameOverSound.hasPlayed == false){

        gameOverSound.play();
        gameOverSound.hasPlayed = true;
    }

  }
}

function updateTail(){
    for(var i = length; i > 0; i--){
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run();
