// Setup Values
let gridWidth = 10; // Width of the grid
let gridHeight = 10; // Height of the grid
let bombPercentage = 0.1; // Percentage
let bombNumber = bombPercentage * gridHeight * gridWidth;
let scale = 30; // Scale of the grid in px
let grid = []; // Stores all grid elements
let gameOver = false; //Sets gameover flag
let gameFinished = false; //Sets game finished flag

let tempNumBombs = 0; //Temporary flag to track the number of bombs generated. Fix this.

//function windowResized() {
//    resizeCanvas(gridWidth * scale, gridHeight * scale);
//}

function setup() {
    createCanvas(gridWidth * scale + 1, gridHeight * scale + 1);
    frameRate(10);

    //Grid Generation variables
    let type = "cell";
    let placedBombs = 0;

    //Generate Grid
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            //This should run untill there are definitly the correct number of bombs.
            if (Math.random() < bombPercentage && placedBombs < bombNumber - 1) { 
                type = "bomb";
                placedBombs++
            } else {
                type = "cell";
            }

            grid.push(new GridElement(type, i, j, false, scale))
        }
    }

    //Calculate the number of actual bombs placed. Fix this.
    for(let cell of grid){
        if(cell.type == "bomb"){
            tempNumBombs++;
        }
    }

    //Calculate Surrounding bombs and cells.
    for (let i = 0; i < grid.length; i++) {
        grid[i].evaluateSurroundingCells(grid);
    }
}

//Register a mouse click on a given cell and set the clicked flag.
function mousePressed() {
    if(!gameOver){

        
            
        

        for (let i = 0; i < grid.length; i++) {
            //Collision Detection
            if (grid[i].position.x * scale < mouseX && grid[i].position.x * scale + scale > mouseX && grid[i].position.y * scale < mouseY && grid[i].position.y * scale + scale > mouseY) {


                if (mouseButton == RIGHT) {
                    grid[i].flag();
                } else {
                    grid[i].bfs_function();
                }
                
            }
        }
    }
    return false;
}

function draw() {
    let cellsOpened = 0; 
    //Draw grid

    for (let element of grid){
        element.draw()
        if(element.clicked && element.type == "bomb"){
            gameOver = true;
        }
        if(element.type == "cell" && element.clicked == true){
            cellsOpened++;
        }
    }

    if(cellsOpened == (grid.length - tempNumBombs)){ //Fix tempNumBombs
        gameFinished = true;
    }

    if(gameOver == true){
        for(let element of grid){
            if(element.type == "bomb"){
                element.isClicked(true);
            }
        }
    }

    if(gameFinished == true){
        fill(0);
        text("Success", width/2, height/2);
    }

    


    
}



