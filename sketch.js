
var mountainImg, mountain
var dog_jumping, dog_runing, dog
var invisibleGround
var boneImg, bone
var boneGroup

var obstacleImg, obstacle, obstacleGroup

var gameState

var score
var restartImg, gameoverImg, retart, gameOver

var gameOversound, barkSound


function preload(){
    mountainImg = loadImage("mountain.jpg")
    dog_runing = loadAnimation("about_jump.png", "runing.png", "about_jump.png")
    boneImg = loadImage("png.png")
    obstacleImg = loadImage("obstacle.png")
    restartImg = loadImage("restart.png")
    gameoverImg = loadImage("game over.png")
    gameOversound = loadSound("gameover.wav")
    barkSound = loadSound("barking.mp3")

    


}

function setup() {

    createCanvas(400, 350)
    mountain = createSprite(200, 200, 15, 20)
    mountain.addImage("mountainpc", mountainImg)

    dog = createSprite(50, 300, 10, 10)
    dog.addAnimation("running", dog_runing)
    dog.scale = 0.4

    invisibleGround = createSprite(0, 310, 476732773800, 10)
    invisibleGround.visible = false;
    
    
    restart = createSprite(200, 275, 20, 15)
    restart.addImage("restart", restartImg)
    restart.scale = 0.05
    
    
    
    gameOver = createSprite(200, 180, 20 , 15)
    gameOver.addImage("gameOver", gameoverImg )
    gameOver.scale = 0.3
    
    

    

    boneGroup = new Group()
    obstacleGroup = new Group()
    
    

    dog.setCollider("circle", 0, 0, 10 )
    

    
    

    score = 0
    gameState = "play"
    
    



    

 
}

function draw() {

    background("black")
    dog.collide(invisibleGround)
    console.log(dog.y)
    
    fill("white")
    text ("score " + score,  350, 20)
    console.log(score)
    
    
    
    
   
    dog.debug = true;

    if (gameState === "play") {

        mountain.velocityX = -3 
    
    if (mountain.x < 200){
        mountain.x = mountain.width/2;
      }
    
    
    
    if(keyDown("Space" )){
        dog.velocityY = -12
        barkSound.play();

    }

    dog.velocityY = dog.velocityY + 0.8
    

    if( boneGroup.isTouching(dog)){
        score+=1
        boneGroup.destroyEach()

    }

    spawnBones()
    spawnObstacles( )
        
    }

    if (obstacleGroup.isTouching(dog)){
        gameState = "end"
    }
    
    if (score%5 === 0 ){
        obstacleGroup.setVelocityEach+=-(4)
    }
    
    restart.visible = false;
    gameOver.visible = false;

    if (gameState === "end"){
        
        mountain.velocityX = 0
        dog.velocityY=0
        obstacleGroup.setVelocityXEach(0)
        boneGroup.setVelocityXEach(0)
        obstacleGroup.setLifetimeEach(-1);
        boneGroup.setLifetimeEach(-1);
        
        
        restart.visible = true;
        gameOver.visible = true;
        
        if(mousePressedOver(restart)){
            reset();
        }
        

    }
    
    

    
    drawSprites();

    
 
}

function spawnObstacles(){
    if (frameCount%50 === 0){
        obstacle = createSprite(400, 300, 5, 10)
        obstacle.addImage("dead", obstacleImg)
        obstacle.scale = 0.05
        obstacle.velocityX = -5
        obstacleGroup.add(obstacle)
        obstacleGroup.setLifetimeEach(250/-3.2)
        
    }
}

function spawnBones(){
    if(frameCount%150 === 0 ){
        bone = createSprite(300, 300, 5, 10)
        bone.addImage("prize", boneImg)
        bone.scale = 0.1
        bone.velocityX = -3
        boneGroup.add(bone)
        boneGroup.setLifetimeEach(250/-3)

        
        
    }

}



function reset(){
    gameState = "play";
    obstacleGroup.destroyEach()
    boneGroup.destroyEach()
    score = 0
}


if (gameState= "end"){
    gameOversound.play()
}