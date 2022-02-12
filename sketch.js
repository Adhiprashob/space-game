
var END=0;

var rocket,rocketImg;
var star,starImg;
var obstacle,obstacleImg;
var gameOver,gameoverImg;
var invisibleGround,invisibleWall1;
var invisibleWall2,score=0;
var gameState="play",play=1;
var  obstacleGroup,starGroup;
var  towerGroup,gameOverSound;
var buttonType;




function preload(){
  rocketImg = loadImage("rocket.png");
    starImg = loadImage("star.png");
    towerImg = loadImage("tower.png");
    obstacleImg = loadImage("obstacle3.png");
    gameoverImg = loadImage("gameOver.png");
     gameOverSound = loadSound("gameover.mp3");
     buttonType = loadSound("buttontyp.wav")
}

function setup(){
  background(200);
createCanvas(600, 600);



// make tower

tower = createSprite(300,900);
tower.addImage(towerImg);
tower.velocityY=1;

// create groups



starGroup=createGroup();
obstacleGroup=createGroup();
  

rocket = createSprite(300,530);
rocket.addImage("rocket",rocketImg);
rocket.scale=0.3;

}








function draw(){

if(gameState==="play"){





spawnObstacle();
spawnStars();


    
// controlls



  if(tower.y > 400){
   tower.y = 300
  }

  if(keyDown("left_arrow")){
    rocket.x-=3;
  buttonType.play();
  }

  if(keyDown("right_arrow")){
    rocket.x+=3;
    buttonType.play();
  }

  

  if(starGroup.isTouching(rocket)){
      
    starGroup.destroyEach();
    score=score+2;
    buttonType.play();
  }


  

  // ground

  

  invisibleWall2 = createSprite(500,100,10,999);
invisibleWall2.visible=false;


  invisibleGround = createSprite(160,590,900,10);
invisibleGround.visible = false;

invisibleWall1 = createSprite(88,100,10,999);
invisibleWall1.visible=false;

rocket.collide(invisibleWall2);
rocket.collide(invisibleWall1);
rocket.collide(invisibleGround);


if(obstacleGroup.isTouching(rocket)){
  gameState=END;

  gameOverSound.play();

  obstacleGroup.destroyEach();
 starGroup.destroyEach();
  starGroup.setVelocityYEach(0);
  obstacleGroup.setVelocityYEach(0);
  rocket.destroy();
  gameOver = createSprite(330,250);
  gameOver.addImage(gameoverImg);
  tower.velocityY=0;

}
}
  






  drawSprites();

textSize(40);
  fill("white");
  text("score"+score,100,100);

 
}



//

function spawnStars(){

  if(frameCount%220===0){
    star = createSprite(300,50)
    star.addImage(starImg);
    star.scale=0.3;    
  star.x=Math.round(random(200,400));
  star.velocityY+=4;
  star.lifetime=700;
  star.scale=0.3
  starGroup.add(star);


  }
}
  

function spawnObstacle(){

  if(frameCount%300===0){
  
  obstacle = createSprite(200,50);
  obstacle.addImage(obstacleImg);
  obstacle.x=Math.round(random(120,500));
  obstacle.velocityY+=4;
  obstacle.lifetime=700;
  obstacle.scale=0.9
obstacleGroup.add(obstacle);

  }
}
