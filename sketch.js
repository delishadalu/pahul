var food
var gameState="hungry"

function preload(){
  dogHappy= loadImage("images/boy2.png");
  dogSad= loadImage("images/boy1.png");  
}

function setup() {
	createCanvas(800, 700);
  
  database =firebase.database();

  dog= createSprite(700,300,50,50);
  dog.addImage(dogSad);
  dog.scale=0.6

  database.ref('food').on("value",readPosition);

  milk1=new Food();
  milk1.getfeedTime();
  milk1.updateState(gameState)
  
  database.ref('gameState').on("value",(data)=>{
    gameState=data.val();
  })
}


function draw() {  
  background(0);

  drawSprites();
  textSize(20);
  fill("white");
  text("Fedtime: "+milk1.feedTime,200,50)


  milk1.buttons();
  milk1.milkImg();

  if(gameState!=="hungry"){
    milk1.button1.hide();
    milk1.button2.hide();
   // dog.remove();
  }
  else{
    milk1.button1.show();
    milk1.button2.show();
  }

if(food===0){
  dog.addImage(dogHappy);
  dog.scale=0.214
}

if(food>0){
  dog.addImage(dogSad);
  dog.scale=0.6
}
console.log(gameState)
}

function readPosition(data){
  food= data.val();
}

function writeStock(data){
  database.ref('/').update({
    food:data,
    feedtime:hour()
  })
}
