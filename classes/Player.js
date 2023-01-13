class Player {
    id; //unique id of the player
    joined = new Date();
    ready = false;
    lastRound = 0;
    currentRound = 0;
    choices = [['A','B','C'],['A','B','C'],['A','B','C']]
    quit; //the date the Player quit the team.

    advanceRound() {
        this.currentRound +=1;
    }
    
    endGame() {
        this.ready = false;
        this.lastRound = this.currentRound;
        this.currentRound = 0;
        this.quit = new Date()
    }
}
module.exports = { Player };