let height = 5
let width = 5
let lastDrop = 0

class Drop {
    x: number
    y: number
    brightness: number
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.brightness = 255
    }
}

let state: number[][] = [];
let rain: Drop[] = [];

// create width x height matrix
function init_board() {
    for(let x = 0; x < width; x++) {
        let arr : number[] = []
        for (let y = 0; y < height; y++) {
            arr.push(255)
        }
        state.push(arr)
    }
}

// decay (half) all brightness in the state
function decay() {
    state.forEach((column, x) => {
        column.forEach((point, y) => {
            state[x][y] = state[x][y] / 2
        })
    })
}

// move all drop one down in the state
function move() {
    // put in state, then move?
    rain.forEach( (drop) => {
        state[drop.x][drop.y] = drop.brightness;
        drop.y ++;
    })
}

// create new drop
function create() {
    let x = randint(0, 4)

    // make drop in same location twice less likely
    if (x == lastDrop) {
        x = randint(0, 4)
    }

    let drop = new Drop(x, 0)
    rain.push(drop)
    lastDrop = x
}


// draw state to screen
function draw() {
    state.forEach( (column, x) => {
        column.forEach ( (point, y) => {
            led.plotBrightness(x, y, point)
        }
    )})
}

init_board()

// stateloop
loops.everyInterval(200, function() {
    decay()
    move()
    draw()
})

//create loop
loops.everyInterval(200, function () {
    create()
})
