// Setup Values
let gridWidth = 10; // Width of the grid
let gridHeight = 10; // Height of the grid
let bombPercentage = 0.1; // Percentage
let bombNumber = bombPercentage * gridHeight * gridWidth;
let scale = 30; // Scale of the grid in px
let grid = []; // Stores all grid elements

function windowResized() {
    resizeCanvas(windowWidth - 100, windowHeight - 100);
}

function setup() {
    createCanvas(windowWidth - 100, windowHeight - 100);
    frameRate(10);

    //Grid Generation variables
    let type = "cell";
    let placedBombs = 0;

    //Generate Grid
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            if (Math.random() < bombPercentage && placedBombs < bombNumber - 1) {
                type = "bomb";
                placedBombs++
            } else {
                type = "cell";
            }

            grid.push(new GridElement(type, i, j, false, scale))
        }
    }
}

function mousePressed() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].position.x * scale < mouseX && grid[i].position.x * scale + scale > mouseX && grid[i].position.y * scale < mouseY && grid[i].position.y * scale + scale > mouseY) {
            grid[i].isClicked(true);
        }
    }
    return false;
}

function draw() {
    background(255);

    

    //Draw a circle with the time in it
    fill(0);
    ellipse(50, 50, 100);
    fill(255);
    textSize(32);
    text(frameCount, 25, 60);


    
}



