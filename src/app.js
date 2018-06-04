import Game from '../game_modules/game'

let height = 0
let width = 0
let generation = 0
let game = null
let interval = null
let stopped = false
let defaultColor = 'rgba(0,0,0,1)'
const $ = (...args) => document.querySelector(...args)

function updateGrid(grid) {
    generation++
    const DOMGrid = $('#grid')
    let output = ''
    output += `<svg viewBox="0 0 ${grid.height} ${grid.width}" xmlns="http://www.w3.org/2000/svg">`
    for (let x = 0; x < height; x++) {
        const line = Object.keys(grid.cells).includes(x.toString()) ? grid.cells[x] : null
        for (let y = 0; y < width; y++) {
            const cell = line && Object.keys(line).includes(y.toString()) ? line[y] : null
            if (cell && cell.alive) {
                if (!cell.color) {
                    cell.color = defaultColor
                    console.log('defaultColor', defaultColor)                    
                }
                output += `<rect class="cell" x="${x}" y="${y}" width="1" height="1" style="fill: ${cell.color}; stroke: ${cell.color}"/>`
            }
        }
    }
    output += '</svg>'
    DOMGrid.innerHTML = output
}

function initControls() {
    const stop = $('#stop')
    stop.onclick = () => {
    }
    $('#stop').onclick = () => {
        stopped = !stopped
        stop.innerText = stopped ? 'Start' : 'Stop'
    }
}

function initSeeds() {
    const seeds = 5
    const seedsEl = $('#seeds')
    let output = ''
    for (let i = 1; i < seeds; i++) {
        output += `<img id="seed${i}" src="./seeds/test${i}.bmp" alt="seed${i}" onclick="select(${i})"/>`
    }
    seedsEl.innerHTML = output
}

function init(seed) {
    height = seed.length
    width = seed[0].length
    game = new Game(seed, width, height)
    game.init(seed)
    updateGrid(game.grid)
    $('#generation').innerText = 'Generation 0'
    if (interval) {
        clearInterval(interval)
    }
    interval = setInterval(() => {
        if (!stopped) {
            game.next()
            updateGrid(game.grid)
            $('#generation').innerText = 'Generation ' + generation
        }
    }, 100)

}

function onDOMContentLoaded() {
    initSeeds()
    initControls()
    $('#generation').innerText = ''
}

function imageLoaded(img, context, canvas) {
    const imgData = context.getImageData(0, 0, canvas.height, canvas.width);
    const BMPSeed = new Array();
    
    for(let i = 0; i < canvas.height; i++){
        BMPSeed[i] = new Array();
        for(let j = 0; j < canvas.width; j++){
            const data = context.getImageData(i, j, 1, 1).data
            BMPSeed[i][j] = `rgba(${data[0]},${data[1]},${data[2]},${(data[3] / 255)})`
            if (BMPSeed[i][j] !== 'rgba(0,0,0,1)' && 
                defaultColor !== BMPSeed[i][j]) {
                defaultColor = BMPSeed[i][j]
            }
        }
    }
    init(BMPSeed)
    canvas.style.display = 'none'
}

function loadSeed(id) {
    generation = 0
    stopped = true
    stop.innerText = stopped ? 'Start' : 'Stop'
    $('#generation').innerText = 'Loading Seed '+id+'...'
    const canvas = $('#hidden-canvas')
    const context = canvas.getContext('2d')
    const img = $('#seed'+id)
    context.drawImage(img, 0, 0);
    if (!img.complete || img.naturalWidth === 0) {
        img.onload = () => { console.log('onload') && imageLoaded(context, canvas) }
    } else {
        imageLoaded(img, context, canvas)
    }
}

window.select = loadSeed

document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

