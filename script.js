//#region Variaveis
const dictDice = {
    1: "img/dice-1.png",
    2: "img/dice-2.png",
    3: "img/dice-3.png",
    4: "img/dice-4.png",
    5: "img/dice-5.png",
    6: "img/dice-6.png"
}

const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")

const btnNew = document.querySelector(".btn--new")
const btnHold = document.querySelector(".btn--hold")

const btnRoll = document.querySelector(".btn--roll")
const diceEl = document.querySelector(".dice")

let whoPlayerIs = 0 //inicia no player zero

let currentScore = {
    0 : 0, //Player 0 : zero pontos
    1 : 0  //Player 1 : zero pontos
}
let totalScore = {
    0 : 0, //Player 0 : zero pontos
    1 : 0  //Player 1 : zero pontos
}
//#endregion

//#region Funções
const resetGame = function() {
    document.getElementById("score--0").textContent = 0
    document.getElementById("score--1").textContent = 0
    document.getElementById("current--0").textContent = 0
    document.getElementById("current--1").textContent = 0

    currentScore[0] = 0
    currentScore[1] = 0
    totalScore[0] = 0
    totalScore[1] = 0

    diceEl.classList.remove('hidden');    
    document.querySelector(`.player--${whoPlayerIs}`).classList.remove('player--winner') //remove apenas o vencendor

    if(!player0.classList.contains('player--active')) {
        player0.classList.add('player--active');
    }

    if(player1.classList.contains('player--active')) {
        player1.classList.remove('player--active');
    }
}

const changePlayer = function()
{
    //Processo de troca de player
    if (player0.classList.contains("player--active")) 
    {
        player0.classList.remove("player--active")
        player1.classList.add("player--active")
        whoPlayerIs = 1
    }
    else {
        player1.classList.remove("player--active")
        player0.classList.add("player--active")
        whoPlayerIs = 0
    }
}

const calculateScore = function()
{
    totalScore[whoPlayerIs] += currentScore[whoPlayerIs] //incrementa os pontos currente ao total de pontos
    document.getElementById(`score--${whoPlayerIs}`).textContent = totalScore[whoPlayerIs]
    
    currentScore[whoPlayerIs] = 0 //coloca o current como zero
    document.getElementById(`current--${whoPlayerIs}`).textContent = currentScore[whoPlayerIs] 

    if(totalScore[whoPlayerIs] >= 100) //Termina o jogo
    {
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${whoPlayerIs}`).classList.add('player--winner');
        document.querySelector(`.player--${whoPlayerIs}`).classList.remove('player--active');
    }
    else {
        changePlayer()
    }
}

const roolDice = function()
{
    let diceRandom = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = dictDice[diceRandom]; //muda a source da foto do dado 

    if(diceRandom === 1){
        currentScore[whoPlayerIs] = 0
        document.getElementById(`current--${whoPlayerIs}`).textContent = currentScore[whoPlayerIs]
        calculateScore();
    }
    else {
        currentScore[whoPlayerIs] += diceRandom
        document.getElementById(`current--${whoPlayerIs}`).textContent = currentScore[whoPlayerIs]
    }

}

//#endregion

//#region Call_Functions
resetGame() //antes de começar limpa o jogo
btnHold.addEventListener("click", calculateScore)
btnNew.addEventListener("click", resetGame)
btnRoll.addEventListener("click", roolDice)
//#endregion