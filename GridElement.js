class GridElement {
    constructor(type, xVal, yVal, clickStatus, gridScale) {
        this.type = type;
        this.position = { x: xVal, y: yVal };
        this.clicked = clickStatus;
        this.gridScale = gridScale;
        this.surroundingBombs = 0;
        this.surroundingCells = [];
        this.flag = false;
    }

    //Switch the click flag
    isClicked(bool) {
        if (bool && !this.flag) {
            this.clicked = true;
        } else if (!bool) {
            this.clicked = false;
        }
    }

    //Switch the flag flag haha
    flagged(canFlagStatus) {
        if (!this.clicked) {
            if (this.flag == true) {
                this.flag = false;
            } else if (canFlagStatus) {
                this.flag = true;
            }
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

    openSurroundingCells() {
        for (let cell of this.surroundingCells) {
            if (cell.type == "cell") {
                cell.isClicked(true);
            }
        }
    }


    bfs_function() {
        let output = [];
        let visited = [];
        let queue = [];

        visited.push(this);
        queue.push(this);

        if (this.surroundingBombs == 0 && !this.flag) {

            while (queue.length > 0) {

                let node = queue.shift(); //stops running the queue for some reason
                output.push(node);

                let connectedCells = node.surroundingCells;
                let nodeGraph = [];

                for (let cell of connectedCells) {
                    if (cell.type == "cell" && cell.surroundingBombs == 0) {
                        nodeGraph.push(cell);
                    }
                }


                for (let neighbour of nodeGraph) {

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
                element.openSurroundingCells();
            }

        } else {
            this.isClicked(true);
        }

    }


    draw() {

        //Drawing rules if cell has been clicked.
        if (this.clicked) {

            fill(210, 210, 210);
            rect(this.position.x * this.gridScale, this.position.y * this.gridScale, this.gridScale, this.gridScale);


            if (!this.surroundingBombs == 0) {

                //fill with different colours depending on the number of surrounding bombs
                if (this.surroundingBombs == 1) {
                    fill(0, 128, 128);
                } else if (this.surroundingBombs == 2) {
                    fill(200, 150, 100);
                } else if (this.surroundingBombs == 3) {
                    fill(200, 80, 120);
                } else if (this.surroundingBombs == 4) {
                    fill(0, 0, 128);
                } else if (this.surroundingBombs == 5) {
                    fill(255, 0, 0);
                } else if (this.surroundingBombs == 6) {
                    fill(0, 0, 255);
                } else if (this.surroundingBombs == 7) {
                    fill(0, 0, 0);
                } else if (this.surroundingBombs == 8) {
                    fill(128, 128, 128);
                }

                textSize(this.gridScale / 2);
                text(this.surroundingBombs, this.position.x * this.gridScale + (this.gridScale / 2.5), this.position.y * this.gridScale + (this.gridScale / 1.5));
            }

            if (this.type == "bomb") {
                fill(255, 0, 0);
                rect(this.position.x * this.gridScale, this.position.y * this.gridScale, this.gridScale, this.gridScale);
            }

            //Drawing rules if cell has not been clicked.
        } else if (!this.clicked) {
            fill(100, 100, 100);
            rect(this.position.x * this.gridScale, this.position.y * this.gridScale, this.gridScale, this.gridScale);

        }

        if (this.flag == true) {
            fill(255)
            ellipse(this.position.x * this.gridScale + (this.gridScale / 2), this.position.y * this.gridScale + (this.gridScale / 2), this.gridScale / 3)

        }





    }

}