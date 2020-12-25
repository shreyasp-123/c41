class Form{
    constructor(){
        this.title = createElement('h1')
        this.input = createInput('name')
        this.button = createButton('Play')
        this.greeting = createElement('h2')
        this.reset = createButton('Reset')
    }
    hide(){
        this.title.hide()
        this.input.hide()
        this.button.hide()
        this.greeting.hide()
    }
    display(){
        this.title.html('Car Racing Game')
        this.title.position(displayWidth/2 - 50, 0)
        this.input.position(displayWidth/2 - 40, displayHeight/2 - 80)
        this.button.position(displayWidth/2 + 30, displayHeight/2)
        this.reset.position(displayWidth-100, 30)

        this.button.mousePressed(() => {
            this.input.hide()
            this.button.hide()
            player.name = this.input.value()
            playerCount++;
            player.index = playerCount
            player.updateCount(playerCount)
            player.update()
            this.greeting.html('Welcome ' + player.name)
            this.greeting.position(displayWidth/2 - 20, displayHeight/4)
        })

        this.reset.mousePressed(() => {
            game.update(0)
            player.updateCount(0)
            database.ref('/').update({
                players: null,
                finishedPlayers: 0
            })
      
        })
    }
}
