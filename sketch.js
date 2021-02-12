var dog,sadDog,happyDog;
var feedDog;
var addFood;
var foodObj;
var FoodS;
var feedTime;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,500);
  database = firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedDog=createButton("Feed the Dog")
  feedDog.position(500,100);
  feedDog.mousePressed(FeedDog);

  addFood=createButton("Add Food")
  addFood.position(600,100);
  addFood.mousePressed(AddFood);

  foodObj=new Food();
  foodStock=database.ref('FoodStock')
  foodStock.on("value", readStock)
}

function draw() {
  background(46,139,87);

  foodObj.display();
  feedTime=database.ref('FeedTime')
  feedTime.on("value", function(data){
    this.lastFed=data.val()
  })
  fill(255,255,254);
  textSize(15);
  if(this.lastFed>=12)
  {
    text("Last Feed : "+ lastFed%12 + "PM", 550,30);
  }else if(this.lastFed==0)
  {
    text("Last Feed : 12 Am", 550,30);
  }else
  {
    text("Last Feed : "+ this.lastFed+ " AM", 550,30);
  }
  

  drawSprites();
}
function FeedDog()
{
   dog.addImage(happyDog)
   
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
     FoodStock:foodObj.getFoodStock(),
     FeedTime:hour()
   })
}
function AddFood()
{
   FoodS++
   database.ref('/').update({
     FoodStock:FoodS
   })
}
function readStock(a)
{
   FoodS=a.val()
   foodObj.updateFoodStock(FoodS)
}
//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
