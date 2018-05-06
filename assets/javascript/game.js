$(document).ready(function () { 
    // reference variables for HTML elements that need to be manipulated
        var topRowContent = $("#top-row-content");    
        var characterHeading = $("#character-heading");     
        var enemyHeading = $("#enemy-heading");     
        var choiceRow = $("#choice-row"); 
        var characterDiv = $(".character-play"); 
        var activePlayer = $("#active-player"); 
        var activeDefender = $("#active-defender"); 
        var battleArena = $("#battle-arena"); 
        var attackText= $("#attack-text"); 
        var defendText= $("#defend-text");  
        var resultText= $("#result-text");  
        var attackButton = $("#attack-button"); 
        var graveyardDiv = $(".graveyard-div");   
        var graveyard = $("#graveyard");   
        var replayButton = $("#replay-button");  

    // initial boolean to turn the game on when the page loads and control the replay button
        var initialState = true; 
        var gameSwitch = true; 
        var kills = 0; 
        var characterFull; 
        var enemyFull;  

    // character values stored as data properties on each character div with 'data' class
        var darthVaderData = $("#darth-vader-data").data("dataProperties", {name: 'Darth Vader', health: 80, attack: 5, counter: 8});
        var yodaData = $("#yoda-data").data("dataProperties", {name: 'Yoda', health: 120, attack: 8, counter: 10,});
        var obiWanData = $("#obi-wan-data").data("dataProperties", {name: 'Obi Wan',health: 140, attack: 4, counter: 7,});
        var hanSoloData = $("#han-solo-data").data("dataProperties", {name: 'Han Solo', health: 100, attack: 8, counter: 5,});  
    
    // conditions for the beggining of the game
        var gameStart = function () {
            battleArena.hide(); 
            graveyardDiv.hide();  
            enemyHeading.hide();   
            replayButton.hide();      
        }

    // when user wins or loses, prevent functions from executing    
        var gameOver = function () {    
            replayButton.show(); 
        }
 
    // takes one parameter, tests if the argument passed has any children
        var playerActive = function () { 
            if (activePlayer.children().length < 1) {
                resultText.text('AWAITING PLAYER CHOICE'); 
                characterFull = false; 
            } else if (activeDefender.children().length < 1) {
                resultText.text('CHOOSE AN ENEMY'); 
                enemyFull = false;   
            }
        }     

        var hasChildren = function (divTest) { // takes one parameter, tests if the argument passed has any children
            if (divTest.children().length > 0) {
                return true;  
            } else {
                return false;   
            }
        }  

    // test for what occurs when the user kills an enemy. Accounts for winning the game when the last enemy dies
        var killedEnemy = function () {
            enemyLive.text('DEFEATED'); 
            newEnemy.css({border: '0.25em solid #ff0000'}).animate({opacity: "0.5", }, 1500, "linear", function() {graveyard.append(newEnemy);});     
            if (kills < 3) {  
                attackText.text("You Defeated " + enemyName + " !")
                defendText.text("");      
                resultText.text('AWAITING NEXT ENEMY'); 
                attackButton.attr('disabled', true);    
            } else if (kills === 3) {    
                attackText.text("You Defeated " + enemyName + " !")
                defendText.text(" You have won the game ! ");   
                resultText.text("");  
                choiceRow.append(newCharacter); 
                enemyHeading.text("WINNER");   
                gameOver(); 
            
            } 
        }      
 
    //Checks if the user has chosen a character and an enemy
        var choosePlayer = function  ()  {
            if (characterFull === false) {
                resultText.text('PLAYER ACTIVE'); 
                var characterChosen = event.target;  
                newCharacter = $(characterChosen); // make jquery object from target so can use methods on it later
                characterLive = newCharacter.find('.data'); // data class of 'p' element. It carries the data values of the character and is updated based on score
                characterHealth = characterLive.data("dataProperties").health; 
                characterAttack = characterLive.data("dataProperties").attack; 
                attackIncrement = characterLive.data("dataProperties").attack; // allows to increment only by base every time attack occurs
                characterName = characterLive.data("dataProperties").name;  
                activePlayer.append(newCharacter);   
                choiceRow.children().addClass('character-enemy').removeClass('character-start'); 
                characterFull = true; 
            } else if  (enemyFull === false) {
                resultText.text('ATTACK ACTIVE'); 
                var enemyChosen = event.target; 
                newEnemy = $(enemyChosen)// make jquery object from target so can use methods on it later
                enemyLive = newEnemy.find('.data');  // data class of 'p' element. It carries the data values of the character and is updated based on score
                enemyHealth = enemyLive.data("dataProperties").health; 
                enemyAttack = enemyLive.data("dataProperties").attack; 
                enemyCounter = enemyLive.data("dataProperties").counter; 
                enemyName = enemyLive.data("dataProperties").name; 
                activeDefender.append(newEnemy);   
                activeDefender.children().addClass('character-defender').removeClass('character-start');    
                enemyFull = true; 
                }     
        };       
        
    // function run if the character's HP goes below 1
        var gotKilled = function () {
            resultText.text("You have been defeated by " + enemyName); 
            defendText.text("Press Replay to Try again");
            attackText.text("");     
            enemyLive.text("CHAMPION");       
            enemyHeading.text("UNCHALLENGED");    
            characterLive.text('DEFEATED');   
            newCharacter.css({border: '0.25em solid #ff0000'});        
            gameOver(); 
        }      

      
   // button click check the state of the game on every call     
    var gameState = function () { 
            enemyHealth = enemyHealth -= characterAttack;
            characterHealth = characterHealth -= enemyCounter;
                if (enemyHealth < 1) {
                    kills ++; 
                    killedEnemy(); 
                } else if (characterHealth < 1 ) {
                    gotKilled();  
                } else {
                    attackText.text("You attacked " + enemyName + " for " + characterAttack + " points !");
                    defendText.text(enemyName + " attacked you back for " + enemyCounter + " points !");
                    characterHealth = characterHealth -= enemyCounter;
                    characterAttack = characterAttack += attackIncrement;   
                    characterLive.text(characterHealth); 
                    enemyLive.text(enemyHealth); 
                }
            }
  
    // Game begins at first function call of game start 
   
    if (initialState === true ) {
        gameStart();   
        choiceRow.on("click", function () { 
            console.log(initialState); 
            gameSwitch = true; 
            topRowContent.hide();    
            battleArena.show();    
            graveyardDiv.show();  
            characterHeading.hide()
            enemyHeading.show(); 
            enemyHeading.text('ENEMIES AVAILABLE'); 
            playerActive();  
        });   
    }
 

    // function that controls state of the game
    if (gameSwitch === true) {
        characterDiv.on('click', function () {
            initialState = false;
            playerActive();  
            choosePlayer();   
             if (hasChildren(activeDefender) && hasChildren(activePlayer) ) {
                attackButton.attr('disabled', false);  
            } 
        });    
    }
 
    attackButton.on ('click', function () {
        gameState(); 
    })

      
});                                                                                                                                                                                                                                                                                                                                                                                                               
          
      
    

