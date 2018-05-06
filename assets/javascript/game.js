$(document).ready(function () { 
    // reference variables for HTML elements that need to be manipulated  
        var choiceRow = $("#choice-row"); 
        var characterHeading = $("#character-heading");     
        var enemyHeading = $("#enemy-heading");     
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

    // character values stored as data properties on each character div with 'data' class
        var darthVaderData = $("#darth-vader-data").data("dataProperties", {name: 'Darth Vader', health: 180, attack: 7, counter: 20});
        var yodaData = $("#yoda-data").data("dataProperties", {name: 'Yoda', health: 150, attack: 8, counter: 20,}); 
        var obiWanData = $("#obi-wan-data").data("dataProperties", {name: 'Obi Wan',health: 100, attack: 14, counter: 5,});
        var hanSoloData = $("#han-solo-data").data("dataProperties", {name: 'Han Solo', health: 120, attack: 8, counter: 15,});    

     // initial value to turn the game on when the page loads and control the replay button
        var kills;  
        var initialHealth;  
        var enemyChosen; 
        var characterChosen; 

    // conditions for start of the game
    var gameInitialize = function () {
        for (var i = 0; i < characterDiv.length; i++) {
            initialHealth = $(characterDiv[i]).find('.data').data('dataProperties').health; 
            $(characterDiv[i]).find('.data').text(initialHealth); 
        }   
        playerActive(); 
        replayButton.hide(); 
        attackText.hide(); 
        defendText.hide();  
        attackButton.attr('disabled', false); 
        characterHeading.show().text("CHOOSE YOUR CHARACTER");  
        enemyHeading.hide(); 
        characterChosen = ''; 
        enemyChosen = ''; 
        kills = 0; 
    } 

    // takes one parameter, tests if the argument passed has any children
       var playerActive = function () { 
        if (activePlayer.children().length < 1) {
            resultText.text('AWAITING PLAYER CHOICE'); 
        } else if (activeDefender.children().length < 1) {
            resultText.text('CHOOSE AN ENEMY'); 
        }
    }    

    // function used to test which div's have any children and control the state of the game
        var hasChildren = function (divTest) {
            if (divTest.children().length > 0) {
                return true;  
            } else {
                return false;   
            }
        }  

    // Sets the conditions for gameplay and Checks if the user has chosen a character and an enemy
        var choosePlayer = function  ()  {
            attackText.show(); 
            defendText.show(); 
            characterHeading.hide(); 
            if (!hasChildren(activePlayer)) {  
                resultText.text('PLAYER ACTIVE'); 
                characterChosen = event.target;  
                newCharacter = $(characterChosen); // make jquery object from target so can use methods on it later
                characterLive = newCharacter.find('.data'); // data class of 'p' element. It carries the data values of the character and is updated based on score
                characterHealth = characterLive.data("dataProperties").health; 
                characterAttack = characterLive.data("dataProperties").attack; 
                attackIncrement = characterLive.data("dataProperties").attack; // allows to increment only by base every time attack occurs
                characterName = characterLive.data("dataProperties").name;  
                activePlayer.append(newCharacter);   
                choiceRow.children().addClass('character-enemy').removeClass('character-start'); 
            } else if (!hasChildren(activeDefender)) {
                resultText.text('ATTACK ACTIVE'); 
                enemyChosen = event.target; 
                newEnemy = $(enemyChosen)// make jquery object from target so can use methods on it later
                enemyLive = newEnemy.find('.data');  // data class of 'p' element. It carries the data values of the character and is updated based on score
                enemyHealth = enemyLive.data("dataProperties").health; 
                enemyAttack = enemyLive.data("dataProperties").attack; 
                enemyCounter = enemyLive.data("dataProperties").counter; 
                enemyName = enemyLive.data("dataProperties").name; 
                activeDefender.append(newEnemy);   
                activeDefender.children().addClass('character-defender').removeClass('character-start');    
                }     
            if (hasChildren(choiceRow)) {
                enemyHeading.show().text('ENEMIES');  
            } else if (!hasChildren(choiceRow)) {
                enemyHeading.show().text('FINAL BATTLE');   
            }
        };     
        
    // called every time attack button is engaged. Checks outcome of attack and game responds accordingly
        var healthCheck = function () { 
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
                    characterAttack = characterAttack += attackIncrement;   
                    characterLive.text(characterHealth); 
                    enemyLive.text(enemyHealth); 
                }
            }

      // test for what occurs when the user kills an enemy. Accounts for winning the game when the last enemy dies
        var killedEnemy = function () {
            enemyLive.text('DEFEATED'); 
            graveyard.append(newEnemy);    
            if (kills < 3) {  
                attackText.text("You Defeated " + enemyName + " !")
                defendText.text("");      
                resultText.text('AWAITING NEXT ENEMY'); 
            } else if (kills === 3) {    
                enemyHeading.text('MISSION SUCCESSFUL'); 
                attackText.text("You Defeated " + enemyName + " !")
                defendText.text(" You have won the game ! ");   
                resultText.text("");  
                characterLive.text("CHAMPION"); 
                gameOver(); 
            
            }  
        }   
    
    // function run if the character's HP goes below 1
           var gotKilled = function () {
            if (hasChildren(choiceRow)) {
                enemyHeading.text("UNCHALLENGED");  
            } else {
                enemyHeading.text('MISSION FAILURE')
            }
            resultText.text("You have been defeated by " + enemyName); 
            attackText.text("");     
            enemyLive.text("CHAMPION");         
            characterLive.text('DEFEATED');       
            gameOver(); 
        }     

    // handles the replay button
        var replay = function () {
            choiceRow.append(characterDiv)
            characterDiv.removeClass('character-enemy character-defender').addClass("character-start")
            gameInitialize();    
        }; 
 
 
    // when user wins or loses, prevent functions from executing    
        var gameOver = function () {    
            replayButton.show(); 
            attackButton.attr('disabled', true) 
            defendText.text('PRESS REPLAY TO PLAY AGAIN'); 
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    if (!hasChildren(activePlayer) && !hasChildren(activeDefender)) {
            gameInitialize();
    }            

    characterDiv.on('click', function () {
        if (!hasChildren(activePlayer) || !hasChildren(activeDefender))
            attackText.text(''); 
            defendText.text('');  
            choosePlayer();   
        });   

    attackButton.on ('click', function () {
        if (!hasChildren(activeDefender)) {
            resultText.text('PICK AN ENEMY TO LAUNCH AN ATTACK')
        } else if (hasChildren(activePlayer) && hasChildren(activeDefender) ) {
            healthCheck(); 
        }  
    }); 
    
    replayButton.on('click', function () {
        replay();  
    });  

    
  
});               










           


          
      
    

