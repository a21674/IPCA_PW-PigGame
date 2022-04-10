//#region Variaveis
const dictDice = {
    1: "img/dice-1.png",
    2: "img/dice-2.png",
    3: "img/dice-3.png",
    4: "img/dice-4.png",
    5: "img/dice-5.png",
    6: "img/dice-6.png"
}

const maxScore = 100 //maximo de pontuação que o jogo vai ter

const btnMachine = document.querySelector(".btn--machine")

const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")

const btnNew = document.querySelector(".btn--new")
const btnHold = document.querySelector(".btn--hold")

const btnRoll = document.querySelector(".btn--roll")
const diceEl = document.querySelector(".dice")

let whoPlayerIs = 0 //inicia no player zero
let modeOfGame = 0

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
    document.getElementById("name--1").textContent = "Player 2"

    currentScore[0] = 0
    currentScore[1] = 0
    totalScore[0] = 0
    totalScore[1] = 0
    whoPlayerIs = 0

    diceEl.classList.remove('hidden');    
    //document.querySelector(`.player--${whoPlayerIs}`).classList.remove('player--winner') //remove apenas o vencendor

    if(!player0.classList.contains('player--active')) {
        console.log("O player 0 nao estava ativo e foi ativo")
        player0.classList.add('player--active');
    }

    if(player1.classList.contains('player--active')) {
        console.log("O player 1 estava ativo e foi desativo")
        player1.classList.remove('player--active');
    }

    if(btnMachine.classList.contains('actived'))
    {
        btnMachine.classList.remove('actived');
        modeOfGame = 0;
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
        
        if(modeOfGame === 1 && whoPlayerIs === 1) {
            player2Automatic()
        }
    }
    else {
        player1.classList.remove("player--active")
        player0.classList.add("player--active")
        whoPlayerIs = 0
    }
}


const player2Automatic = function() 
{    
    console.log("entrou no player2Automatic")
    let nTimes = Math.trunc(Math.random() * 3);
    for(i = 0; i <= nTimes; i++) {
        console.log("entrou no ciclo for")
        delay(5000)
        roolDice()
        //wait(1000)
    }
    holdGame()
}

const holdGame = function()
{
    totalScore[whoPlayerIs] += currentScore[whoPlayerIs] //incrementa os pontos currente ao total de pontos
    document.getElementById(`score--${whoPlayerIs}`).textContent = totalScore[whoPlayerIs]
    
    currentScore[whoPlayerIs] = 0 //coloca o current como zero
    document.getElementById(`current--${whoPlayerIs}`).textContent = currentScore[whoPlayerIs] 
    console.log("atualizou o score")

    if(totalScore[whoPlayerIs] >= maxScore) //Termina o jogo
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
        holdGame();
    }
    else {
        currentScore[whoPlayerIs] += diceRandom
        document.getElementById(`current--${whoPlayerIs}`).textContent = currentScore[whoPlayerIs]
    }
}

const changeModeOfGame = function()
{
    if(btnMachine.classList.contains('actived'))
    {
        resetGame()
        btnMachine.classList.remove('actived');
        document.getElementById("name--1").textContent = "Player 2"
        modeOfGame = 0;
    }
    else {
        resetGame()
        btnMachine.classList.add('actived');
        document.getElementById("name--1").textContent = "Computer"
        modeOfGame = 1;
    }
}

async function delay(ms) { //https://masteringjs.io/tutorials/fundamentals/wait-1-second-then
    new Promise(resolve => setTimeout(resolve, ms));
    console.log("Entrou no delay..")
}
function wait(ms){
    console.log("Entrou no wait..")
    let start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

//#endregion

//#region Call_Functions
resetGame() //antes de começar limpa o jogo
btnMachine.addEventListener("click", changeModeOfGame)
btnHold.addEventListener("click", holdGame)
btnNew.addEventListener("click", resetGame)
btnRoll.addEventListener("click", roolDice)
//#endregion