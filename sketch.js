var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var track, invisibleTrack, trackImage;
var bricksGroup, brickImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score=0;

var gameOver, restart;

function preload(){
  bg=loadImage("pngtree-simple-light-blue-background-image_396574.jpg")
  boy_running =   loadImage("running-cartoon-png-favpng-vkFmuRvin8e44qCVYAkMJZ2RM.jpg");
  
  trackImage = loadImage("rail-tracks-side-view-small-260nw-622920767.webp");
  
  gameOverImg = loadImage("gameover.png");
  
  brickImage = loadImage("red-brick-wall-260nw-126365846.webp")
  restartImg = loadImage("restart.png");
  
  jumpSound=loadSound("362328__josepharaoh99__platform-jump.mp3")
  dieSound=loadSound("320247__nicktermer__scream.wav")
  checkPointSound=loadSound("455021__tissman__checkpoint.wav")
}

function setup() {
  createCanvas(600, 350);
  
  boy = createSprite(50,295,20,50),
  
    boy.addAnimation("running",boy_running);
    boy.addAnimation("collided", boy_collided);
    boy.scale = 2;
    boy.debug=true
   track = createSprite(200,330,400,20);
  track.addImage("track",track);
  track.x = track.width /2;
  track.velocityX = -(2);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,300,400,10);
  invisibleGround.visible = false;
  
  bricksGroup = new Group();
  obstaclesGroup = new Group();
  fill(0);
textSize(24);
textFont('player');
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(bg);
  text("Score: "+ score, 480,30);
  
  if (gameState===PLAY){
    
    track.velocityX = -(12);
  
    if(keyDown("space") && boy.y >= 250) {
      boy.velocityY = -12;
      jumpSound.play();
    }
  if(score>0 && score%10 === 0){
       checkPointSound.play() 
    }
    boy.velocityY = boy.velocityY + 0.5
    
    if (track.x < 0){
      track.x = track.width/2;
    }
    for (var i = 0; i < bricksGroup.length; i++) {
    
      if(bricksGroup.get(i).isTouching(mario)){
      bricksGroup.get(i).remove()
      score =score+1;
        
    boy.collide(invisibleGround);
    spawnbricks();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
      jumpSound.play();
    }
  }
   if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    track.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bricksGroup.setVelocityXEach(0);
     
    
    boy.changeAnimation("collided",boy_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bricksGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
    }
  
  drawSprites();
}
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,270,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    obstacle.addAnimation("obstacles",obstacleimage)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnbricks() {
  //write code here to spawn the brick
  if (frameCount % 60 === 0) {
    var brick = createSprite(600,120,40,10);
    brick.debug=true
    brick.y = Math.round(random(150,180));
    brick.addImage(brickImage);
    brick.scale = 1;
    brick.velocityX = -3;
    
     //assign lifetime to the variable
    brick.lifetime = 200;
    
    //adjust the depth
    brick.depth = boy.depth;
    boy.depth = boy.depth + 1;
    
    //add each brick to the group
    bricksGroup.add(brick);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  bricksGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  boy.changeAnimation("running",boy_running);
  
  
  score = 0;
  
}