class Cell {
    constructor(x, y, alive=false, color=null) {
        this.x = x
        this.y = y
        this.alive = alive
        this.color = color
    }
}

class Grid {
    constructor(preset, width, height) {
        this.width = width
        this.height = height
        this.cells = {}
        preset.forEach((line, y) => {
            this.cells[y] = {}
            line.forEach((pixel, x) => {
                this.cells[y][x] = new Cell(x, y, 
                    pixel !== 'rgba(0,0,0,1)', 
                    pixel !== 'rgba(0,0,0,1)' ? pixel : null)
            })
        })
    }
    getLiveCells () {
        const alive = []
        for (let lineIndex in this.cells) {
            const line = this.cells[lineIndex]
            for (let cellIndex in line) {
                if (line[cellIndex].alive) {
                    alive.push(line[cellIndex])
                }
            }
        }
        return alive
    }
    getCell(y, x) {
        if (!this.cells[y]) {
            this.cells[y] = {}
        }
        if (!this.cells[y][x]) {
            this.cells[y][x] = new Cell(x, y)
        }
        return this.cells[y][x]
    }
    getNeighbours (cell) {
        const x = cell.x
        const y = cell.y
        const neighbours = []
        neighbours.push(this.getCell(y - 1, x - 1))
        neighbours.push(this.getCell(y - 1, x))
        neighbours.push(this.getCell(y - 1, x + 1))
        neighbours.push(this.getCell(y, x - 1))
        neighbours.push(this.getCell(y, x + 1))
        neighbours.push(this.getCell(y + 1, x - 1))
        neighbours.push(this.getCell(y + 1, x))
        neighbours.push(this.getCell(y + 1, x + 1))
        return neighbours
    }
    getLiveNeighbours (cell) {
        return this.getNeighbours(cell).filter((neighbour) => neighbour.alive)
    }
}

module.exports = Grid
