class GridElement {
    constructor(type, xVal, yVal, clicked, scale) {
        this.type = type;
        this.position = { x: xVal, y: yVal };
        this.clicked = clicked;
        this.scale = scale;
        this.bombs = 0;
    }

    isClicked(bool) {
        if (bool) {
            this.clicked = true;
        } else if (!bool) {
            this.clicked = false;
        }
    }

    surroundingBombCount(grid) {
        let bombs = 0;
        let toCheck = [];
        let x = this.position.x;
        let y = this.position.y;

        for (let i = 0; i < grid.length; i++) {
            let xCheck = grid[i].position.x;
            let yCheck = grid[i].position.y;

            //Get all cells surrouning this cell
            if (xCheck == x - 1 && yCheck == y - 1) {
                toCheck.push(grid[i])
            }
            if (xCheck == x && yCheck == y - 1) {
                toCheck.push(grid[i])
            }
            if (xCheck == x + 1 && yCheck == y - 1) {
                toCheck.push(grid[i])
            }
            if (xCheck == x - 1 && yCheck == y) {
                toCheck.push(grid[i])
            }
            if (xCheck == x + 1 && yCheck == y) {
                toCheck.push(grid[i])
            }
            if (xCheck == x - 1 && yCheck == y + 1) {
                toCheck.push(grid[i])
            }
            if (xCheck == x && yCheck == y + 1) {
                toCheck.push(grid[i])
            }
            if (xCheck == x + 1 && yCheck == y + 1) {
                toCheck.push(grid[i])
            }

        }

        //Itterate through all relevant cells and check for bombs
        for (let i = 0; i < toCheck.length; i++) {
            if (toCheck[i].type == 'bomb') {
                bombs += 1;
            }
        }

        this.bombs = bombs;
    }


    draw() {
        if (this.clicked) {
            fill(200, 200, 200);
            rect(this.position.x * scale, this.position.y * scale, scale, scale);

            fill(0);
            text(this.bombs, this.position.x * this.scale + (this.scale / 2), this.position.y * this.scale + (this.scale / 2));

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