var trex, trex_running,trexcolide
var groundImage,ground,chao;
var clouds,cloudimage
var cacto,cactoimage1,cactoimage2,cactoimage3,cactoimage4,cactoimage5,cactoimage6
var score = 0
var grupodecactos,grupodenuvens
var stats = "jogar"
var gameover,gameoverimage
var restart,restartimage
var pulo,die,upscore



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 trexcolide = loadImage ("trex_collided.png")
  groundImage = loadImage("ground2.png")
 cloudimage = loadImage ("cloud.png")
gameoverimage = loadImage ("gameOver.png")
restartimage = loadImage ("restart.png")


cactoimage1 = loadImage  ("obstacle1.png")
cactoimage2 = loadImage  ("obstacle2.png")
cactoimage3 = loadImage  ("obstacle3.png")
cactoimage4 = loadImage  ("obstacle4.png")
cactoimage5 = loadImage  ("obstacle5.png")
cactoimage6 = loadImage  ("obstacle6.png")
pulo = loadSound ("jump.mp3")
die =  loadSound ("die.mp3")
upscore = loadSound ("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  ground = createSprite (width/2,height-20,width,15)
  ground.addImage (groundImage)
  //criando o trex
  trex = createSprite(50,height-60,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage ("trexcolide",trexcolide)
  edges = createEdgeSprites();
  chao = createSprite (width/2,height-10,width,10)
  chao.visible = false
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
//criar grupo
grupodenuvens = new Group ()
grupodecactos = new Group ()
trex.debug = false
 trex.setCollider ("circle",0,0,40)
//trex.setCollider ("rectangle",50,0,80,200,90)
gameover = createSprite (width/2,height/2)
gameover.addImage (gameoverimage)
restart = createSprite (width/2,height/2+50)
restart.addImage (restartimage)
restart.scale = 0.5
restart.visible = false
gameover.visible = false
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
 //impedir que o trex caia
  trex.collide(chao)
  drawSprites();
if (score > 0&&score % 1000 === 0) {
upscore.play () 
}


if (stats === "jogar") {
text ("score"+score,width-100,15)
score=score+Math.round (getFrameRate()/30) 
//pular quando tecla de espaço for pressionada
if(touches.length>0||keyDown("space")&&trex.y>height-20){
  trex.velocityY = -10;
  pulo.play ()
  touches=[]

  }

trex.velocityY = trex.velocityY + 0.5;
ground.velocityX = - 7
  if (ground.x<0){
    ground.x = ground.width/2
  }
  geranuvems ()
gerarcactos ()
//tocar no cacto pra perder
if (trex.isTouching(grupodecactos)) {
  stats = "fim"
  die.play ()
 //trex.velocityY = -12
 //pulo.play()
}
}else if (stats === "fim") {
ground.velocityX =  0
trex.velocityY = 0
trex.changeAnimation ("trexcolide",trexcolide)
grupodecactos.setVelocityXEach (0)
grupodenuvens.setVelocityXEach (0)
grupodecactos.setLifetimeEach (-1)
grupodenuvens.setLifetimeEach (-1)
gameover.visible = true
restart.visible = true

if (touches.length>0||mousePressedOver(restart)) {
recomecar ();
touches=[]

}
}

}
function recomecar  () {
stats = "jogar"
restart.visible = false
gameover.visible = false
grupodecactos.destroyEach ()
grupodenuvens.destroyEach ()
trex.changeAnimation("running", trex_running);
score = 0
}



function geranuvems () {
if (frameCount%60 === 0) {
  clouds = createSprite (width,150)
clouds.addImage (cloudimage)
clouds.velocityX = - 7
clouds.depth = trex.depth
trex.depth = trex.depth +1
clouds.y = Math.round (random(9,height-60))
clouds.lifetime = 400
grupodenuvens.add (clouds)
}
}
function gerarcactos () {

if (frameCount%60 === 0)  {
cacto = createSprite (width,height-30)
cacto.velocityX = -(7+score/100) 
cacto.scale = 0.8
var cactovar = Math.round (random(1,6))
cacto.lifetime = 400
cacto.debug = false
switch (cactovar) {

case 1: cacto.addImage(cactoimage1)
break;

case 2: cacto.addImage(cactoimage2)
break;

case 3: cacto.addImage(cactoimage3)
break;

case 4: cacto.addImage(cactoimage4)
break;

case 5: cacto.addImage(cactoimage5)
break;

case 6: cacto.addImage(cactoimage6)
break;
default:break

}
grupodecactos.add (cacto)



}









}
