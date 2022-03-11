class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

 start(){
  form = new Form();
  form.display();

  player = new Player()
  playerCount = player.getCount()

  officer1 = createSprite(50,50,5,5)
  officer1.addImage("gun",officerImage)
  officer1.scale = 0.3

  officer2 = createSprite(50,100,5,5)
  officer2.addImage("gun2",officerImg)
  officer2.scale = 0.3

  officers = [officer1,officer2]
 }

 handleElements() {
  form.hide();

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2+200,80);
    
    this.resetButton.class("resetButton")
    this.resetButton.position(width/2+240,40)
}

 play(){
  this.handleElements();
  this.handleResetButton();
  Player.getPlayersInfo();

  if(allPlayers !== undefined)
    {
    image(backgroundImg,0,0,width,height)
    image(buildImg,0-250,0-25,850,height+100)

    var index = 0;
    
    for(var plr in allPlayers){
      index = index+1;
      var x = allPlayers[plr].positionX;
      var y = height- allPlayers[plr].positionY;

      officers[index-1].position.x =x;
      officers[index-1].position.y =y;

      

      if(index === player.index ){
        stroke(10)
        fill("red")
        ellipse(x,y,60,60)
       
       }

      this.handlePlayercontrols();
     

      

      }

    }

    if(keyDown("space")){
      bullet = createSprite(100,50,10,10)
      bullet.addImage("bullet",bulletImg)
      bullet.velocityX = 5
      bullet.scale = 0.5
      bullet.y = player.positionY
      console.log(bullet.velocityX)
      bulletGroup.add(bullet)
    }

    drawSprites();
 }
    handlePlayercontrols(){
      if(keyIsDown(UP_ARROW )){
        player.positionY+=10;
        player.update();
      }

      if(keyIsDown(DOWN_ARROW)){
        player.positionY-=10;
        player.update();
      }

      if(player.positionY < 30){
        player.positionY = 40
      }
     
      if(player.positionY > windowHeight-30 ){
        player.positionY = windowHeight-40
      }

      

    }

   



    handleResetButton(){
      this.resetButton.mousePressed(() => {
        database.ref("/").set({
          playerCount : 0,
          gameState : 0,
          players : {},
        })
        window.location.reload()
      })
    }

   
}
