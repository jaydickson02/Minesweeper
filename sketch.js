// Setup Values
let gridWidth = 20; // Width of the grid
let gridHeight = 20; // Height of the grid
let bombPercentage = 0.18; // Percentage
let bombNumber = Math.floor(bombPercentage * gridHeight * gridWidth);
let gridScale; // Scale of the grid in px
let grid = []; // Stores all grid elements
let gameOver = false; //Sets gameover flag
let gameFinished = false; //Sets game finished flag
let ui; //Stores the UI
let gridSize; //Stores the grid size selector
let timerStarted = false; //Sets timer started flag
let canvas; //Stores the canvas
let stillCanFlag = true; //Sets allowance for flagging

//Reset the game
function resetGame(selectedSize) {

    //Set the grid size and bomb number based on the selected size

    if (selectedSize == "Small") {
        gridWidth = 10;
        gridHeight = 10;
    } else if (selectedSize == "Medium") {
        gridWidth = 20;
        gridHeight = 20;
    } else if (selectedSize == "Large") {
        gridWidth = 40;
        gridHeight = 20;
    }
    else if (!isNaN(selectedSize)) { //Check if the selected size is a number
        gridWidth = parseInt(selectedSize);
        gridHeight = parseInt(selectedSize);
    }

    bombNumber = Math.floor(bombPercentage * gridHeight * gridWidth);
    grid = [];
    gameOver = false;
    gameFinished = false;
    gameStarted = false;
    timerStarted = false;
    setup();
}

//place bombs on the grid
function placeBombs(startCells) {

    //Place bombs on the grid
    for (let i = 0; i < bombNumber; i++) {
        let bombPlaced = false;
        while (!bombPlaced) {
            let randomIndex = Math.floor(Math.random() * grid.length);
            console.log(grid[randomIndex])
            console.log(startCells)
            if (grid[randomIndex].type == "cell" && !startCells.includes(grid[randomIndex])) {
                grid[randomIndex].type = "bomb";
                bombPlaced = true;
                console.log("Bomb Placed at " + grid[randomIndex].x + ", " + grid[randomIndex].y);
            }
        }
    }


    //Calculate Surrounding bombs and cells.
    for (let i = 0; i < grid.length; i++) {
        grid[i].evaluateSurroundingCells(grid);
    }
}

function centerCanvas(canvas) {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}


function setup() {
    //Set the grid scale depending on the window size
    gridScaleHeight = Math.floor((windowHeight - 100) / gridHeight);
    gridScaleWidth = Math.floor((windowWidth - 20) / gridWidth);

    if (gridScaleHeight < gridScaleWidth) {
        gridScale = gridScaleHeight;
    } else {
        gridScale = gridScaleWidth;
    }

    //Create the canvas and center it
    canvas = createCanvas(gridWidth * gridScale + 1, (gridHeight + 1) * gridScale + 1);
    centerCanvas(canvas);

    //Prevent right click menu from appearing on canvas
    canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())

    //Add three grid size option buttons and set their positions and onClick functions.
    let smallButton = createButton("Small");
    smallButton.position(5, 5);
    smallButton.mousePressed(() => resetGame("Small"));

    let mediumButton = createButton("Medium");
    mediumButton.position(55, 5);
    mediumButton.mousePressed(() => resetGame("Medium"));

    let largeButton = createButton("Large");
    largeButton.position(120, 5);
    largeButton.mousePressed(() => resetGame("Large"));

    //Add reset button
    let resetButton = createButton("Reset");
    resetButton.position(200, 5);
    resetButton.mousePressed(resetGame);

    //Initialize UI
    ui = new UI(0, 0, millis(), gridScale);

    //Grid Generation variables
    let placedBombs = 0;

    //Generate Grid
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 1; j < gridHeight + 1; j++) { //Plus one accounts for the UI
            grid.push(new GridElement("cell", i, j, false, gridScale))
        }
    }

}

//Register a mouse click on a given cell and set the clicked flag.
function mousePressed() {
    if (!gameOver) {

        for (let i = 0; i < grid.length; i++) {
            //Collision Detection
            if (grid[i].position.x * gridScale < mouseX && grid[i].position.x * gridScale + gridScale > mouseX && grid[i].position.y * gridScale < mouseY && grid[i].position.y * gridScale + gridScale > mouseY) {

                //Check if the timer has started, if not, place the bombs
                if (timerStarted == false) {


                    //start cell and surrounding cells cannot be bombs
                    let startCell = grid[i];

                    //get surrounding cells
                    startCell.evaluateSurroundingCells(grid);
                    let safeStartCells = startCell.surroundingCells;

                    //add start cell to safe cells
                    safeStartCells.push(startCell);

                    //place bombs
                    placeBombs(safeStartCells);

                    //Reset the timer
                    ui.resetStartTime();
                    timerStarted = true;

                }

                if (mouseButton == RIGHT) {
                    grid[i].flagged(stillCanFlag);

                } else {
                    grid[i].bfs_function();
                }

            }
        }
    }
    return false;
}

function draw() {


    //Run timer if the game has started and is not over or finished.
    if (timerStarted && !gameOver && !gameFinished) {
        ui.timer();
    }


    background(255);

    let cellsOpened = 0;
    let flagsPlaced = 0;

    //Draw grid
    for (let element of grid) {
        element.draw()
        if (element.clicked && element.type == "bomb") {
            gameOver = true;
        }
        if (element.type == "cell" && element.clicked == true) {
            cellsOpened++;
        }
        if (element.flag == true) {
            flagsPlaced++;
        }
    }

    //Draw UI
    stillCanFlag = ui.bombCounter(bombNumber, flagsPlaced);
    ui.draw();

    //Check if game is finished
    if (cellsOpened == (grid.length - bombNumber)) {
        gameFinished = true;
    }

    //Reveal all bombs if game is over
    if (gameOver == true) {
        for (let element of grid) {
            if (element.type == "bomb") {
                element.isClicked(true);
            }
        }
    }

    //Win the game
    if (gameFinished == true && gameOver == false) {

        let coordx = width / 2 - 60
        let coordy = height / 2
        fill(255, 255, 255);
        rect(coordx - 5, coordy - 30, 125, 35)
        fill(0);
        textSize(30);
        text("Success", coordx, coordy);
    }


}



