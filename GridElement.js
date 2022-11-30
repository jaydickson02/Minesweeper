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

    unlockSurroundingCells(previousCheckedCells) {

        this.isClicked(true);

        let checkedCells = previousCheckedCells;
        let cellsToCheck = []
        let newCell;

        //Checks for new surrounding cells that haven't been checked already
        for (let i = 0; i < this.surroundingCells.length; i++) {
            newCell = true;
            for (let j = 0; j < checkedCells.length; j++) {
                if (this.surroundingCells[i] == checkedCells[j]) {
                    newCell = false;
                }
            }

            //Adds cells if its new and has a surrounding bomb number of zero
            if (newCell == true && this.surroundingCells[i].surroundingBombs == 0 && !this.surroundingCells.clicked) {
                cellsToCheck.push(this.surroundingCells[i])
            }
        }

        //Combines the previous checked cells and the current checked cells
        let allCheckedCells = checkedCells.concat(cellsToCheck);

        //Runs the function recursivly on all the new cells to check
        if (cellsToCheck.length > 0) {
            for (let i = 0; i < cellsToCheck.length; i++) {
                cellsToCheck[i].unlockSurroundingCells(allCheckedCells);
            }
        }

    }

    bfs_function() {
        let output = [];
        let visited = [];
        let queue = [];

        visited.push(this);
        queue.push(this);

        while (queue) {
            let m = queue.shift(); //stops running the queue for some reason
            output.push(m);

            let mGraph = m.surroundingCells;
            console.log(mGraph.length);
            for (let neighbour of mGraph) {

                if (!visited.includes(neighbour)) {
                    //console.log(neighbour);
                    visited.push(neighbour);
                    queue.push(neighbour);
                }
            }
            console.log(queue.length)
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