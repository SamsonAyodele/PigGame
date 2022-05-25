



let scores, roundScore, activePlayer, dice, gamePlaying;


init();

var lastDice = dice ;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

         // 1. Random number 
     let dice1 = Math.floor(Math.random() * 6) + 1;
     let dice2 = Math.floor(Math.random() * 6) + 1;

     // 2. Display the result
     document.getElementById('dice-1').style.display = 'block';
     document.getElementById('dice-2').style.display = 'block';
     document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
     document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

     // 3. Update the round score if the rolled number was NOT a 1
     if (dice1 !== 1 && dice2 !== 1) {
        //Add score 
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else {
        // Next player 
       nextPlayer();
   }
     /*
     if (dice === 6 && lastDice === 6) {
         //player looses score 
         scores[activePlayer] = 0;
         document.querySelector('#score-' + activePlayer).textContent = '0';
         nextPlayer();
     } else if (dice !== 1){
         //Add score 
         roundScore += dice1 + dice2;
         document.querySelector('#current-' + activePlayer).textContent = roundScore;
     } else {
         // Next player 
        nextPlayer();
    }
        lastDice = dice;
        */
     }

}); 

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {

        //Add current score to global score 
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    let input = document.querySelector('.final-score').value;
    let winningScore;
    //undefined, 0, null, "" are coerced to false
    //anything else is coerced to true 
    if(input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'winner';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false
    } else {
        // Next player
        nextPlayer();
    }
   
    }
    
});

function nextPlayer() {

     // Next player 
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;

     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
    
     document.getElementById('dice-1').style.display = 'none';
     document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true

    document.getElementById('dice-1').style.display = 'none';
     document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'player-1';
    document.getElementById('name-1').textContent = 'player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}