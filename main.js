const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const overallScore = document.querySelector("#score")
const gameOverDisplay = document.querySelector("#active")
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let speed = 0.9
let intervalTime = 1000
let timerId = 0


function createGrid(){
    for (let i=0;i < width*width; i++){
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()



currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame (){
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    gameOverDisplay.style.display = "none"
    currentSnake = [2,1,0]
    direction = 1
    score = 0
    overallScore.textContent = score
    intervalTime = 1000
    generateApples()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

startBtn.addEventListener("click", startGame)

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
        
    ){
        gameOverDisplay.style.display = "block"
        return clearInterval(timerId)
    }
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)
    
    
        
        
    if(squares[currentSnake[0]].classList.contains("apple")){
        squares[currentSnake[0]].classList.remove("apple")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        generateApples()
        score++
        overallScore.textContent = score
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)

        }
    squares[currentSnake[0]].classList.add("snake")
}


function generateApples(){
    do{
        appleIndex = Math.floor(Math.random()* 100 +1)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}
generateApples()

const upBtn = document.getElementById("up").addEventListener("click", function(){
    direction = -width
})
const leftBtn = document.getElementById("left").addEventListener("click", function(){
    direction = -1
})
const rightBtn = document.getElementById("right").addEventListener("click", function(){
    direction = 1
})
const downBtn = document.getElementById("down").addEventListener("click", function(){
    direction = +width
})


document.addEventListener("keydown", e => {
    if (e.key == "ArrowUp"){
        direction = -width
    } else if (e.key == "ArrowDown"){
        direction = +width
    } else if (e.key == "ArrowRight"){
        direction = 1
    } else if (e.key == "ArrowLeft"){
        direction = -1
    }
})