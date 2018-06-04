import Game from '../game_modules/game'
import gameServer from './gameServer'

let height = 0
let width = 0
let generation = 0
let game = null
let interval = null
let stopped = false

function updateGrid(grid) {
    generation++
    const DOMGrid = document.querySelector('#grid')
    let output = ''
    output += `<svg viewBox="0 0 ${grid.height} ${grid.width}" xmlns="http://www.w3.org/2000/svg">`
    for (let x = 0; x < height; x++) {
        const line = Object.keys(grid.cells).includes(x.toString()) ? grid.cells[x] : null
        for (let y = 0; y < width; y++) {
            const cell = line && Object.keys(line).includes(y.toString()) ? line[y] : null
            if (cell) {
                output += cell.alive ? `<rect class="cell" x="${x}" y="${y}" width="1" height="1" fill="${cell.color}"/>`: ''
            }
        }
    }
    output += '</svg>'
    DOMGrid.innerHTML = output
}

function initControls() {
    const stop = document.getElementById('stop')
    stop.onclick = () => {
    }
    document.getElementById('stop').onclick = () => {
        stopped = !stopped
        stop.innerText = stop.innerText === 'Stop' ? 'Start' : 'Stop'
    }
}

function init(seed) {
    height = seed.length
    width = seed[0].length
    game = new Game(seed, width, height)
    game.init(seed)
    updateGrid(game.grid)
    interval = setInterval(() => {
        if (!stopped) {
            game.next()
            updateGrid(game.grid)
            document.getElementById('generation').innerText = 'Generation ' + generation
        }
    }, 100)
    initControls()
}

function testGrid(BMPSeed, canvas) {
    const DOMGrid = document.querySelector('#grid')
    let output = ''
    output += `<svg viewBox="0 0 ${canvas.height} ${canvas.width}" xmlns="http://www.w3.org/2000/svg">`
    for (let x = 0; x < canvas.height; x++) {
        const line = BMPSeed[x]
        for (let y = 0; y < canvas.width; y++) {
            const cell = line[y]
            if (cell) {
                console.log('cell', cell)
                output += cell !== 'rgba(0,0,0,1)' ? `<rect class="cell" x="${x}" y="${y}" width="1" height="1" fill="${cell}"/>`: ''
            }
        }
    }
    output += '</svg>'
    console.log(grid)
    DOMGrid.innerHTML = output
}


function imageLoaded(img, context, canvas) {
    const imgData = context.getImageData(0, 0, canvas.height, canvas.width);
    const BMPSeed = new Array();
    
    for(let i = 0; i < canvas.height; i++){
        BMPSeed[i] = new Array();
        for(let j = 0; j < canvas.width; j++){
            const data = context.getImageData(i, j, 1, 1).data
            BMPSeed[i][j] = `rgba(${data[0]},${data[1]},${data[2]},${(data[3] / 255)})`
        }
    }
    //    testGrid(BMPSeed, canvas)
    init(BMPSeed)
    img.style.display = 'none'
}

function loadBMPSeed() {
    const canvas = document.getElementById('hidden-canvas')
    const context = canvas.getContext('2d')
    const img = document.getElementById('hidden-img')
    context.drawImage(img, 0, 0);
    if (!img.complete || img.naturalWidth === 0) {
        img.onload = () => { console.log('onload') && imageLoaded(context, canvas) }
    } else {
        imageLoaded(img, context, canvas)
    }

    
}

document.addEventListener('DOMContentLoaded', loadBMPSeed, false);

