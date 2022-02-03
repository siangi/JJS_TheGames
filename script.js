const ANIMATION_LENGTH = 1800;
const TIMEOUT_LENGTH = 1000;

const CHOICES = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors"
}

const RESULTS = {
    USER_WIN: "user_win",
    COMPUTER_WIN: "computer_win",
    DRAW: "draw"
}

function userChooses(userChoice){
    setButtons(false);
    let computerChoice = getComputerChoice();
    animateHandShaking();
    changePlayerHands(userChoice, computerChoice);
    console.log(computerChoice);
    setTimeout(() => {
        showResult(evaluateResult(userChoice, computerChoice));
    }, ANIMATION_LENGTH);
    setTimeout(resetPlayfield, ANIMATION_LENGTH + TIMEOUT_LENGTH);
}

function getComputerChoice(){
    let randChoice = Math.random()*3;
    if(randChoice <= 1){
        return CHOICES.ROCK;
    } else if (randChoice <= 2){
        return CHOICES.PAPER;
    } else if (randChoice <= 3){
        return CHOICES.SCISSORS;
    }
}

function evaluateResult(userChoice, computerChoice){
    if (userChoice == computerChoice){
        return RESULTS.DRAW;
    }

    if ((userChoice == CHOICES.ROCK && computerChoice == CHOICES.SCISSORS) 
        || (userChoice == CHOICES.PAPER && computerChoice == CHOICES.ROCK)
        || (userChoice == CHOICES.SCISSORS && computerChoice == CHOICES.PAPER)){
        return RESULTS.USER_WIN;
    }

    return RESULTS.COMPUTER_WIN;
}

function animateHandShaking(){
    let hands = document.querySelectorAll(".player");

    for (let i = 0; i < hands.length; i++){
        hands[i].classList.add("shake");
        // remove the class again after the animation
        setTimeout(() => {hands[i].classList.remove("shake")}, 1800);
    }
}

function changePlayerHands(userChoice, computerChoice){
    document.querySelector("#player1").classList.add(userChoice);
    document.querySelector("#player2").classList.add(computerChoice);
}

function showResult(result){
    switch (result){
        case RESULTS.USER_WIN:
            document.querySelector("#win").classList.remove("hidden");
            break;
        case RESULTS.COMPUTER_WIN:
            document.querySelector("#lose").classList.remove("hidden");
            break;
        case RESULTS.DRAW:
            document.querySelector("#draw").classList.remove("hidden");
            break;
    }
}

function setButtons(enabled){
    buttons = document.querySelectorAll("button");

    if (enabled){
        document.querySelector("#buttons").classList.remove("disabled");
    } else {
    document.querySelector("#buttons").classList.add("disabled");
    }
    

    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled  = !enabled;
    }
}

function resetPlayfield(){
    hands = document.querySelectorAll(".player");
    for (let i = 0; i < hands.length; i++){
        hands[i].classList.remove("shake");
        hands[i].classList.remove(CHOICES.ROCK);
        hands[i].classList.remove(CHOICES.PAPER);
        hands[i].classList.remove(CHOICES.SCISSORS)
    }
    setButtons(true);
    document.querySelector("#win").classList.add("hidden");
    document.querySelector("#lose").classList.add("hidden");
    document.querySelector("#draw").classList.add("hidden");    
}


