class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value", (data) => {
            gameState = data.val()
        })
    }
    update(state){
        database.ref('/').update({
            gameState: state
        })
    }
    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value")
            if(playerCountRef.exists()){
                playerCountRef.val()
                player.getCount()
            }
            form = new Form
            form.display()
        }
        car1 = createSprite(100, 200)
        car2 = createSprite(300, 200)
        car3 = createSprite(500, 200)
        car4 = createSprite(700, 200)

        car1.addImage("car1Img", car1Img)
        car2.addImage("car2Img", car2Img)
        car3.addImage("car3Img", car3Img)
        car4.addImage("car4Img", car4Img)
        
        cars = [car1, car2, car3, car4]

        playerStatusFinished = false
    }

    play(){
        form.hide()
        Player.getPlayerInfo()
        player.getFinishedPlayers()
        if(allPlayers !== undefined){
            background(44)
            image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
            //var displayPosition = 100
            var index = 0
            var x = 175
            var y
            for(var plr in allPlayers){
                index = index + 1
                x = x + 220
                y = displayHeight - allPlayers[plr].distance
                cars[index - 1].x = x
                cars[index - 1].y = y
                if(index === player.index){
                    fill("red")
                    ellipse(x, y, 70, 70)
                    camera.position.x = displayWidth/2
                    camera.position.y = cars[index -1].y
                }
                //displayPosition = displayPosition + 30
                textSize(20)
                textAlign(CENTER)
                fill("yellow")
                text(allPlayers[plr].name , cars[index - 1].x, cars[index - 1].y + 70)
            }
        }
        
        if(keyDown(UP_ARROW) && player.index !== null && playerStatusFinished === false){
            player.distance += 10
            player.update()
        }

        if(player.distance > 4300 && playerStatusFinished === false){
            Player.updateFinishedPlayers()
            player.rank = finishedPlayers
            player.update()
            playerStatusFinished = true
        }

        drawSprites();
    }

    displayRank(){
        camera.position.x = 0
        camera.position.y = 0
        Player.getPlayerInfo()
        imageMode(CENTER)
        image(goldImg, 0, -100, 250, 300)
        image(silverImg, -displayWidth/4, displayHeight/10 - 100, 220, 270)
        image(bronzeImg, displayWidth/4, displayHeight/9 - 100, 200, 240)
        textSize(30)
        textAlign(CENTER)
        fill("yellow")
        for(var plr in allPlayers){
            if(allPlayers[plr].rank === 1){
                text("1st: " + allPlayers[plr].name, 0, 85)
            } else if(allPlayers[plr].rank === 2){
                text("2nd: " + allPlayers[plr].name, -displayWidth/4, displayHeight/10 + 80)
            } else if(allPlayers[plr].rank === 3){
                text("3rd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 80)
            } else{
                text("Better Luck Next Time " + allPlayers[plr].name + "!!!", displayWidth/10 - 100, 200)
            }
        }
    }
}