const veld = document.querySelector('#game')
const snake = document.querySelector('#snake')
const apple = document.querySelector('#apple')
const start = document.querySelector('#start')
const punten = document.querySelector('#punten')
const gameover = document.querySelector('#gameover')
const timer = document.querySelector('#timer')

let WKeyPressed = false
let Spelende = false
let wijziger = 100
let wijzigInterval;
let bewegendeLinks = false
let bewegendeRechts = false
let bewegendeBoven = false
let bewegendeOnder = false
let beweegTempo = 300
let appleInterval = 9000
let intervalAppleSet
let puntenTeller = 0
let tijd = 60

// Troubleshooting mede mogelijk gemaakt door Manuel ()
// Code zorgt dat de snake word geladen en op de juiste positie word ingesteld.
window.addEventListener('load', function () {
    start.style.display = 'block'
    snake.style.display = 'none'
    snake.style.position = 'absolute'
    snake.style.top = 600 + 'px'
    snake.style.left = 800 + 'px'
    apple.style.display = 'none'
    apple.style.position = 'absolute'
    gameover.style.display = 'none'
})


// https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
function checkCollision() {
    const snakePos = snake.getBoundingClientRect()
    const applePos = apple.getBoundingClientRect()
    return (
        snakePos.left === applePos.left && snakePos.top === applePos.top
    )
}

// Hulp bij troubleshooten van Manuel
function actieCollision() {
    if (checkCollision()) {
        spawnApple()
        beweegTempo -= 10
        appleInterval -= 300
        clearInterval(intervalAppleSet)
        intervalAppleSet = setInterval(spawnApple, appleInterval)
        console.log('Collision!')
        puntenTeller += 1
        punten.textContent = 'Punten: ' + puntenTeller
    }
}


function timerActie() {
    tijd -= 1
    timer.textContent = 'Tijd:' + tijd +'sec'
    if(tijd < 1){
        eindigGame()
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function spawnApple() {
    const veldBreed = 1424
    const veldHoog = 1500
    const appleSize = 100
    const randomX = Math.floor(Math.random() * (veldBreed / appleSize)) * appleSize
    const randomY = Math.floor(Math.random() * (veldHoog / appleSize)) * appleSize
    console.log('spawn')
    apple.style.left = randomX + 'px'
    apple.style.top = randomY + 'px'
}

// Geholpen door Manuel
function stapLinks() {
    let leftHuidig = parseInt(snake.style.left)
    if (bewegendeLinks == true) {
        snake.style.left = (leftHuidig - wijziger) + 'px'
        actieCollision()
    }
    if (leftHuidig < 100) {
        eindigGame()
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
function stapRechts() {
    let leftHuidig = parseInt(snake.style.left)
    if (bewegendeRechts == true) {
        snake.style.left = (leftHuidig + wijziger) + 'px'
        actieCollision()
    }
    if (leftHuidig > 1500) {
        eindigGame()
    }
}
function stapBoven() {
    let topHuidig = parseInt(snake.style.top)
    if (bewegendeBoven == true) {
        snake.style.top = (topHuidig - wijziger) + 'px'
        actieCollision()
    }
    if (topHuidig < 100) {
        eindigGame()
    }

}
function stapOnder() {
    let topHuidig = parseInt(snake.style.top)
    if (bewegendeOnder == true) {
        snake.style.top = (topHuidig + wijziger) + 'px'
        actieCollision()
    }
    if (topHuidig > 1324) {
        eindigGame()
    }
}

function reset() {
    clearInterval(wijzigInterval);
    bewegendeLinks = false;
    bewegendeRechts = false;
    bewegendeBoven = false;
    bewegendeOnder = false;
}

function eindigGame() {
    snake.style.opacity = '0'
    apple.style.opacity = '0'
    gameover.style.display = 'flex'
    clearInterval(timerInterval)
}



// Geholpen door Manuel en https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key 
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && !bewegendeLinks && !bewegendeRechts && Spelende) {
        reset()
        bewegendeLinks = true
        wijzigInterval = setInterval(stapLinks, beweegTempo)
    }
    if (event.key === 'ArrowRight' && !bewegendeRechts && !bewegendeLinks && Spelende) {
        reset()
        bewegendeRechts = true
        wijzigInterval = setInterval(stapRechts, beweegTempo)
    }
    if (event.key === 'ArrowUp' && !bewegendeBoven && !bewegendeOnder && Spelende) {
        reset()
        bewegendeBoven = true
        wijzigInterval = setInterval(stapBoven, beweegTempo)
    }
    if (event.key === 'ArrowDown' && !bewegendeBoven && !bewegendeOnder && Spelende) {
        reset()
        bewegendeOnder = true
        wijzigInterval = setInterval(stapOnder, beweegTempo)
    }
})

start.addEventListener('click', function () {
    Spelende = true;
    console.log('Spelende')
    if (Spelende) {
        start.style.display = 'none'
        snake.style.display = 'block'
        apple.style.display = 'block'
        spawnApple()
        clearInterval(intervalAppleSet)
        timerInterval = setInterval(timerActie, 1000)
        intervalAppleSet = setInterval(spawnApple, appleInterval)
    } else {
        snake.style.display = 'none'
    }
})

// Hulp van ChatGPT, laten uitleggen en begrijp de code.
// 0-1 * (1424 / 100) * 100
// 0-1 * (1500 / 100) * 100