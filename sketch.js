const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var breakButton;
var stones = [];

function preload(){
  zombie1 = loadImage("zombie.png");
  zombie2 = loadImage("zombie.png");
  zombie3 = loadImage("zombie.png");
  zombie4 = loadImage("zombie.png");
  backgroundImage = loadImage("background.png");
  sad = loadImage("sad_zombie.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  engine = Engine.create();
  world = engine.world;
  base = new Base(100,680,200,200);
  base2 = new Base(1250,680,200,200);
  bridge = new Bridge(24,{x:120, y:250});
  joinPoint = new Base(1300,250,50,50);
  Matter.Composite.add(bridge.body, joinPoint);
  jointLink = new Link(bridge, joinPoint);
  zombie = createSprite(width/2, height - 100);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addImage("sad", sad);
  zombie.scale = 0.1;
  zombie.velocityX = 0.5;
 
  breakButton = createImg("axe.png");
  
  breakButton.position(width- 200, height/2 - 50);
  breakButton.size(100,100);
  breakButton.mouseClicked(handleButtonPress);
  frameRate(80);
  for (var i = 0; i <= 8; i++){
    var x = random(width/2 - 200, width/2 + 300);
    var y = random(-10,140);
  var stone = new Stone(x,y,80,80);
    stones.push(stone);
  }
}

function draw() {
 //console.log(stones);
 background(51);
 image(backgroundImage,windowWidth/200, windowHeight/200,windowWidth, windowHeight);;
  //base.show();
  //base2.show();
  bridge.show();
  for (var stone in stones){
   stones[stone].show();
  }
  Engine.update(engine);
 drawSprites();
 for (var stone of stones){
  stone.show();
  var pos = stone.body.position;
  var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y)
  if (distance <= 50){
    zombie.velocityX = 0;
    Matter.Body.setVelocity(stone.body, {x:10, y:-10});
    zombie.changeImage("sad");
    collided = true;
  }
}
}
function handleButtonPress(){
  console.log(5);
  jointLink.detach();
  setTimeout(()=> {
    bridge.break();
  }, 1500);
  
}

