const Grid = require('./grid')

class ExecutionStack {
    constructor () {
        this.instructions = {"KILL": this.kill, "LIVE": this.live}
        this.stack = []
    }
    kill (cell) {
        cell.alive = false
    }
    live (cell) {
        cell.alive = true
    }
    push (cell, instruction) {
        this.stack.push({cell: cell, instruction: instruction})
    }
    execute () {
        this.stack.forEach((action) => {
            if (Object.keys(this.instructions).includes(action.instruction)) {
                this.instructions[action.instruction](action.cell)
            } else {
                console.error('ExecutionStack :: Unknown instruction', action)
            }
        })
    }
}

class Game {
    constructor (seed, width=20, height=10) {
        this.width = width
        this.height = height
        this.preset = this.buildPreset(seed)
        this.executionStack = new ExecutionStack()
        this.cycle = 0
        console.log(`Game :: Creating new Game instance with
                    \twidth: ${width}
                    \theight: ${height}
                    \tpreset: \n${this.preset}`)
    }
    buildPreset (seed) {
        return seed
    }
    init () {
        console.log('Game :: initialized')
        this.grid = new Grid(this.preset, this.width, this.height)
    }
    next () {
        const liveCells = this.grid.getLiveCells()
        liveCells.forEach((cell) => {
            const liveNeighbours = this.grid.getLiveNeighbours(cell)
            const neighbours = this.grid.getNeighbours(cell)
            if (liveNeighbours.length < 2) {
                this.executionStack.push(cell, 'KILL')
            } else if (liveNeighbours.length > 3) {
                this.executionStack.push(cell, 'KILL')
            }
            neighbours.forEach((cell) => {
                if (!cell.alive) {
                    const liveNeighbours = this.grid.getLiveNeighbours(cell)
                    if (liveNeighbours.length === 3) {
                        this.executionStack.push(cell, 'LIVE')
                    }
                }
            })
        })
        this.executionStack.execute()
        this.cycle++
    }
}

module.exports = Game
