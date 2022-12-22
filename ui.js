//Create consturctor for UI Class
class UI {

    constructor(bombs, flags, timeStart, gridScale) {
        this.bombs = bombs;
        this.flags = flags;
        this.timeStart = timeStart;
        this.time = 0;
        this.gridScale = gridScale;
    }

    resetStartTime() {
        this.timeStart = millis();
    }


    //Create Timer Method
    timer() {

        //Get current time
        let currentTime = millis();
        //Calculate time passed
        let timePassed = currentTime - this.timeStart;

        //Get minites
        let minutes = Math.floor(timePassed / 60000);
        //Get seconds
        let seconds = Math.floor((timePassed % 60000) / 1000);

        //Add 0 to seconds if less than 10
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        //Set time
        this.time = minutes + ":" + seconds;


    }


    //BombCounter
    bombCounter(totalBombs, flags) {

        if (flags >= totalBombs) {
            this.bombs = 0;
            return false;
        }

        this.bombs = totalBombs - flags;
        return true;

    }

    //Draw Method
    draw() {
        //Draw Timer
        fill(0);

        //Set text size based on grid scale
        textSize(this.gridScale / 2);
        text("Timer: " + this.time, 10, this.gridScale - 5);

        //Draw Bomb Counter
        fill(0);

        //Set text size based on grid scale
        textSize(this.gridScale / 2);
        text("Bombs: " + this.bombs, this.gridScale * 4.5, this.gridScale - 5);

    }

}