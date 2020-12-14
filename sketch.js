var database,dogL,dog,dog,dog2;
var position,feed,add, foodobject, Feedtime, Lastfeed;

function preload(){
  dog1 = loadImage("Dog.png");
  dog2 = loadImage("happydog.png");	
}

function setup() {

  createCanvas(700, 400);
  
  database = firebase.database();

  foodobject=new Food();

  dog = createSprite(550,250,10,10);
  dog.addImage(dog1);
 
  dog.scale=0.2
  
  var dog = database.ref('Food');
  dog.on("value", readPosition);

  feed = createButton("FEED DRAGO");
  feed.position(700,60);
  feed.mousePressed(FeedDog);

  if(feed.mousePressed(FeedDog)){
    
  }

  add = createButton("ADD FOOD");
  add.position(600,60);
  add.mousePressed(AddFood);

} 


function draw(){

  background("green");
  foodobject.display();
  fill(255,255,254);
  textSize(15);
  
  fedtime=database.ref('FeedTime');
  fedtime.on("value",function(data){ Lastfeed=data.val(); });
 if(Lastfeed<=12)
 {
   text("Last Fed :" + Lastfeed%12==0 + "PM", 300,60);
 }else if(Lastfeed  === 0 )
 {
   text("Last Fed : 12 AM" , 300,60)
 }else{
   text("Last Fed :" + Lastfeed + "AM", 300,60);
 }
 drawSprites();

 }

function readPosition(data){
  
  position = data.val();
  foodobject.updateFoodStock(position);
  console.log(position.x);
  
}


function writePosition(w){
  if(w>0){
    w=w-1
  }else{
    w=0
   
  }

  database.ref('/').set({
    'Food': w
  });

}


function AddFood(){
  position++
  database.ref('/').update({
  Food:position
});
}


function FeedDog(){
  block = createSprite(550,250,200,200);
  block.shapeColor="green";

 dogL = createSprite(550,250,10,10);
 dogL.addImage(dog2);
 dogL.scale = 0.2;




 
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
database.ref('/').update({
Food:foodobject.getFoodStock(),
FeedTime:hour ()
 });
}



