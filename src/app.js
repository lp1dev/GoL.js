import Game from '../game_modules/game'

let height = 0
let width = 0
let generation = 0
let alive = 0
let game = null
let interval = null
let speed = 50
const pixelSize = 2
let stopped = false
let buffer = null
let canvas = null
const $ = (...args) => document.querySelector(...args)

function setPixel(imageData, cell) {
    var index = (cell.y + cell.x * imageData.width) * 4;
      imageData.data[index+0] = cell.color_array[0]
      imageData.data[index+1] = cell.color_array[1]
      imageData.data[index+2] = cell.color_array[2]
      imageData.data[index+3] = cell.color_array[3]
}

function drawPixels(imageData, x, y, cell) {
    setPixel(imageData, cell)
    // {
    //     x: x * pixelSize,
    //     y: y * pixelSize,
    //     r: cell.color_array[0],
    //     g: cell.color_array[1],
    //     b: cell.color_array[2],
    //     a: cell.color_array[3]
    //   });

    // for(let j = 0; j < pixelSize; j++){
    //     for(let k = 0; k < pixelSize; k++){
    //      setPixel( imageData, {
    //          x: x * pixelSize + j,  
    //          y: y * pixelSize + k,
    //          r: cell.color_array[0],
    //          g: cell.color_array[1],
    //          b: cell.color_array[2],
    //          a: cell.color_array[3]
    //        });
    //       }
    //   }
}

function pre_render(grid, canvas, context) {

    const imageData = context.createImageData(canvas.width, canvas.height)

    for (let x = 0; x < height; x++) {
        const line = grid.cells[x]
        for (let y = 0; y < width; y++) {
            const cell = line[y]
            if (cell && cell.alive) {
                alive++
                // context.fillStyle = cell.rgba
                // context.fillRect(x, y, 1, 1)
                drawPixels(imageData, x, y, cell)
            }
        }
    }
    buffer.getContext('2d').putImageData(imageData, 0, 0)
    return buffer
}

function updateGrid(grid) {
    console.log('updateGrid')
    alive = 0
    const context = canvas.getContext('2d')
    const buffer = pre_render(grid, canvas, context)
    // context.imageSmoohingEnabled = false    
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(buffer, 0, 0)
    // context.putImageData(imageData, 0, 0)
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
    buffer = document.createElement('canvas')
    canvas = $('#grid')
    $('#generation').innerText = 'Generation 0'
    updateGrid(game.grid)
    playPause(true)
}

function next() {
    // game.next()
    updateGrid(game.grid)
    $('#generation').innerHTML = `Generation : <b>${++generation}</b><br/>Alive : <b>${alive}</b>`
}

function playPause(forceValue = null) {
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

    for (let i = 0; i < canvas.height; i++) {
        BMPSeed[i] = new Array();
        for (let j = 0; j < canvas.width; j++) {
            const data = context.getImageData(i, j, 1, 1).data
            BMPSeed[i][j] = {
                rgba: `rgba(${data[0]},${data[1]},${data[2]},${(data[3] / 255)})`,
                array: [data[0], data[1], data[2], data[3]]
            }
        }
    }
    init(BMPSeed)
    // canvas.style.display = 'none'
}

function loadSeed(id) {
    generation = 0
    $('#generation').innerText = `Loading Seed ${id}...`
    const canvas = $('#grid')
    const context = canvas.getContext('2d')
    const img = $('#seed' + id)
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

