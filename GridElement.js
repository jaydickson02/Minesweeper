class GridElement {
    constructor(type, xVal, yVal, clickStatus, scale) {
        this.type = type;
        this.position = { x: xVal, y: yVal };
        this.clicked = clickStatus;
        this.scale = scale;
        this.surroundingBombs = 0;
        this.surroundingCells = [];
    }

    isClicked(bool) {
        if (bool) {
            this.clicked = true;
        } else if (!bool) {
            this.clicked = false;
        }
    }

    //Check the 8 surrounding cells for the number of bombs and generate an array containing the cells.
    evaluateSurroundingCells(grid) {
        let bombs = 0;
        let surroundingCells = [];
        let x = this.position.x;
        let y = this.position.y;

        for (let i = 0; i < grid.length; i++) {
            let xCheck = grid[i].position.x;
            let yCheck = grid[i].position.y;

            //Get all cells surrouning this cell
            if (xCheck == x - 1 && yCheck == y - 1) {
                surroundingCells.push(grid[i])
            }
            if (xCheck == x && yCheck == y - 1) {
                surroundingCells.push(grid[i])
            }
            if (xCheck == x + 1 && yCheck == y - 1) {
                surroundingCells.push(grid[i])
            }
            if (xCheck == x - 1 && yCheck == y) {
                surroundingCells.push(grid[i])
            }
            if (xCheck == x + 1 && yCheck == y) {
                surroundingCells.push(grid[i])
            }
            if (xCheck == x - 1 && yCheck == y + 1) {
                surroundingCells.push(grid[i])
            }
            if (xCheck == x && yCheck == y + 1) {
                surroundingCells.push(grid[i])
            }
            if (xCheck == x + 1 && yCheck == y + 1) {
                surroundingCells.push(grid[i])
            }

        }

        //Itterate through all relevant cells and check for bombs
        for (let i = 0; i < surroundingCells.length; i++) {
            if (surroundingCells[i].type == 'bomb') {
                bombs += 1;
            }
        }

        this.surroundingBombs = bombs;
        this.surroundingCells = surroundingCells;
    }



    bfs_function() {
        let output = [];
        let visited = [];
        let queue = [];

        visited.push(this);
        queue.push(this);

        while (queue.length > 0) {
            
            console.log(queue);
            console.log(queue.length)
            let m = queue.shift(); //stops running the queue for some reason
            console.log(m);
            output.push(m);

            let mGraph = m.surroundingCells;
            
            for (let neighbour of mGraph) {

                if (!visited.includes(neighbour)) {
                    //console.log(neighbour);
                    visited.push(neighbour);
                    queue.push(neighbour);
                }
            }
            
        }

        //console.log(output.length);

        for (let element of output) {
            element.isClicked(true);
        }

    }


    draw() {
        if (this.clicked) {
            fill(200, 200, 200);
            rect(this.position.x * scale, this.position.y * scale, scale, scale);

            fill(0);
            text(this.surroundingBombs, this.position.x * this.scale + (this.scale / 2), this.position.y * this.scale + (this.scale / 2));

        } else if (!this.clicked) {
            fill(100, 100, 100);
            rect(this.position.x * scale, this.position.y * scale, scale, scale);
        }

        if (this.type == "bomb") {
            fill(255, 0, 0);
            rect(this.position.x * scale, this.position.y * scale, scale, scale);
        }


    }

}