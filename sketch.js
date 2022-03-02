var balloon,balloonImage1,balloonImage2;
var cima,baixo,esquerda,direita;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  
  createCanvas(1500,700);
  database=firebase.database();
  cima = createSprite(750,0,1500,50);
  baixo = createSprite(750,700,1500,50);
  esquerda = createSprite(0,350,50,700);
  direita = createSprite(1500,350,50,700);

  cima.visible=(false);
  baixo.visible=(false);
  esquerda.visible=(false);
  direita.visible=(false);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonPosition = database.ref('/');
  balloonPosition.on('value',readPosition);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown('a')){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(-1,0);
    // balloon.x = balloon.x - 1;
    // database.ref("/").update({
    //   x:balloon.x,
    //   y:balloon.y
    // })

    
  }
  else if(keyDown('d')){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(+1,0);
    
    // balloon.x = balloon.x + 1;
    // database.ref("/").update({
    //   x:balloon.x,
    //   y:balloon.y
    // })

  }
  else if(keyDown('w')){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,-1);
    
    // balloon.y = balloon.y - 1;
    // database.ref("/").update({
    //   x:balloon.x,
    //   y:balloon.y
    // })

  }
  else if(keyDown('s')){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,+1)
    
    
    // balloon.y = balloon.y + 1;
    // database.ref("/").update({
    //   x:balloon.x,
    //   y:balloon.y
    // })

  }
  collide();
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function changePosition(x,y){
  database.ref('/').set({
  x : balloon.x + x,
  y : balloon.y + y,
  })
  
}

function readPosition(data){
  position = data.val()
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function collide () {
  balloon.collide(cima);
  balloon.collide(baixo);
  balloon.collide(esquerda);
  balloon.collide(direita);


}