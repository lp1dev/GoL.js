import Game from '../game_modules/game'

let height = 0
let width = 0
let generation = 0
let alive = 0
let game = null
let interval = null
let speed = 50
let stopped = false
const $ = (...args) => document.querySelector(...args)

function updateGrid(grid) {
    let output = ''
    alive = 0
    for (let x = 0; x < height; x++) {
        const line = Object.keys(grid.cells).includes(x.toString()) ? grid.cells[x] : null
        for (let y = 0; y < width; y++) {
            const cell = line && Object.keys(line).includes(y.toString()) ? line[y] : null
            if (cell && cell.alive) {
                alive++
                output += `<rect class="cell" x="${x}" y="${y}" width="1" height="1" style="fill: ${cell.color}; stroke: ${cell.color}"/>`
            }
        }
    }
    $('#svg-grid').innerHTML = output
}

function initSeeds() {
    const seeds = 5
    const seedsEl = $('#seeds')
    let output = ''
    for (let i = 0; i < seeds; i++) {
        output += `<img id="seed${i}" src="./seeds/test${i}.bmp" alt="seed${i}" onclick="select(${i})"/>`
    }
    seedsEl.innerHTML = output
}

function init(seed) {
    height = seed.length
    width = seed[0].length
    game = new Game(seed, width, height)
    game.init(seed)
    $('#generation').innerText = 'Generation 0'
    $('#grid').innerHTML = `<svg id="svg-grid" viewBox="0 0 ${game.grid.height} ${game.grid.width}" xmlns="http://www.w3.org/2000/svg"></svg>`
    updateGrid(game.grid)
    playPause(true)
}

function next() {
    game.next()
    updateGrid(game.grid)
    $('#generation').innerHTML = `Generation : <b>${++generation}</b><br/>Alive : <b>${alive}</b>`
}

function playPause(forceValue=null) {
    if (forceValue) {
        stopped = forceValue
    } else {
        stopped = !stopped
    }
    $('#stop').innerText = stopped ? 'Start' : 'Stop'    
    if (stopped) {
        clearInterval(interval)
    } else {
        interval = setInterval(next, speed)
    }
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
    init(BMPSeed)
    canvas.style.display = 'none'
}

function loadSeed(id) {
    generation = 0
    $('#generation').innerText = `Loading Seed ${id}...`
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

function onDOMContentLoaded() {
    initSeeds()
    $('#stop').onclick = () => playPause()
}

function changeSpeed(value) {
    speed = value    
    playPause(true)
    playPause(false)
}

window.select = loadSeed
window.next = next
window.changeSpeed = changeSpeed

document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

