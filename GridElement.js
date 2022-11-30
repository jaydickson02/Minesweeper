class GridElement {
    constructor(type, xVal, yVal, clickStatus, scale) {
        this.type = type;
        this.position = { x: xVal, y: yVal };
        this.clicked = clickStatus;
        this.scale = scale;
        this.surroundingBombs = 0;
        this.surroundingCells = [];
        this.flag = false;
    }

    //Switch the click flag
    isClicked(bool) {
        if (bool) {
            this.clicked = true;
        } else if (!bool) {
            this.clicked = false;
        }
    }

    //Switch the flag flag haha
    flag(){
        if(this.flag == true){
            this.flag == false;
        } else {
            this.flag == true;
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

    openSurroundingCells(){
        for(let cell of this.surroundingCells){
            if(cell.type == "cell"){
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

        if(this.surroundingBombs == 0){

        while (queue.length > 0) {
            
            let node = queue.shift(); //stops running the queue for some reason
            output.push(node);

            let connectedCells = node.surroundingCells;
            let nodeGraph = [];

            for (let cell of connectedCells){
                if(cell.type == "cell" && cell.surroundingBombs == 0){
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
            fill(200, 200, 200);
            rect(this.position.x * scale, this.position.y * scale, scale, scale);

            fill(0);
            if(this.surroundingBombs > 0){
                text(this.surroundingBombs, this.position.x * this.scale + (this.scale / 2), this.position.y * this.scale + (this.scale / 2));
            }
            
            if (this.type == "bomb") {
                fill(255, 0, 0);
                rect(this.position.x * scale, this.position.y * scale, scale, scale);
            }

        //Drawing rules if cell has not been clicked.
        } else if (!this.clicked) {
            fill(100, 100, 100);
            rect(this.position.x * scale, this.position.y * scale, scale, scale);
        }

        


    }

}