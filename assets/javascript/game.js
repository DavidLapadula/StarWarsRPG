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

// value counters  
var darthVaderData = $("#darth-vader-data").data("dataProperties", {name: 'Darth Vader', health: 250, attack: 5, counter: 8});
var yodaData = $("#yoda-data").data("dataProperties", {name: 'Yoda', health: 200, attack: 10, counter: 9,});
var obiWanData = $("#obi-wan-data").data("dataProperties", {name: 'Obi Wan',health: 150, attack: 12, counter: 10,});
var hanSoloData = $("#han-solo-data").data("dataProperties", {name: 'Han Solo', health: 100, attack: 8, counter: 12,});  
 
// logic and flags for game play
var gameSwitch = true; 
var kills = '0'; 
var newEnemy; 

//initial div values
battleArena.hide(); 
graveyardDiv.hide();  
enemyHeading.hide();
replayButton.hide();          

// Functions used during the game

    var hasChildren = function (divTest) { // takes one parameter, tests if the argument passed has any children
        if (divTest.children().length > 0) {
            return true; 
        } else {
            return false;   
        }
    } 

    var imageOverlay = function () {
        // for every child of graveyard

    }

    var killedEnemy = function () {
        enemyLive.text('DEFEATED'); 
        switch (true) {
            case (kills < 3): 
                // imageOverlay();  
                graveyard.append(newEnemy);   
                attackText.text("You Defeated " + enemyName + " !")
                defendText.text("");    
                resultText.text('AWAITING NEXT ENEMY'); 
                attackButton.attr('disabled', true); 
                    break;  
            case (kills >= 3): 
                // imageOverlay(); 
                graveyard.append(newEnemy);   
                attackText.text("You Defeated " + enemyName + "!")
                defendText.text(" You have won the game ! ");   
                resultText.text(""); 
                choiceRow.append(newCharacter); 
                enemyHeading.text("WINNER");  
                //game ending function
        }
    }           

 var gotKilled = function () {
    resultText.text("You have been defeated by " + newEnemy); 
    defendText.text("Press Replay to Try again");
    choiceRow.append(newEnemy); 
    enemyHeading.text("NOT TODAY");      
    //game ending function
 }

var choosePlayer = function  ()  {
    switch (true) { 
            case (!hasChildren(activePlayer)):
                resultText.text('PLAYER ACTIVE'); 
                var characterChosen = event.target;  
                newCharacter = $(characterChosen); // make jquery object from target so can use methods on it later
                    characterLive = newCharacter.find('.data'); // data class of 'p' element. It carries the data values of the character and is updated based on score
                            characterHealth = characterLive.data("dataProperties").health; 
                            characterAttack = characterLive.data("dataProperties").attack; 
                                attackIncrement = characterLive.data("dataProperties").attack; // allows to increment only by base every time attack occurs
                            characterCounter = characterLive.data("dataProperties").counter;  
                            characterName = characterLive.data("dataProperties").name;  
                activePlayer.append(newCharacter);   
                choiceRow.children().addClass('character-enemy').removeClass('character-start'); 
                    break; 
            case (hasChildren(activePlayer) && !hasChildren(activeDefender)):   
                resultText.text('ATTACK ACTIVE'); 
                var enemyChosen = event.target; 
                newEnemy = $(enemyChosen)// make jquery object from target so can use methods on it later
                    enemyLive = newEnemy.find('.data');  // data class of 'p' element. It carries the data values of the character and is updated based on score
                        enemyHealth = enemyLive.data("dataProperties").health; 
                        enemyAttack = enemyLive.data("dataProperties").attack; 
                        enemyCounter = enemyLive.data("dataProperties").counter; 
                        enemyName = enemyLive.data("dataProperties").name; 
                        defendText.text(''); 
                        attackText.text(''); 
                attackButton.attr('disabled', false);  
                activeDefender.append(newEnemy);  
                activeDefender.children().addClass('character-defender').removeClass('character-start');  
                    break;  
        }  
    };     


    var gameState = function () {
    switch (true) {
        case (enemyHealth < 1 ):
            kills ++; 
            killedEnemy(); 
                break; 
        case (characterHealth < 1):  
            gotKilled();  
                break; 
        case (characterHealth >= 1 && enemyHealth >= 1):   
            attackText.text("You attacked " + enemyName + " for " + characterAttack + " points !");
            defendText.text(enemyName + " attacked you back for " + enemyCounter + " points !");
            characterHealth = characterHealth -= enemyCounter;
            characterAttack = characterAttack += attackIncrement;   
            characterLive.text(characterHealth); 
            enemyLive.text(enemyHealth); 
                break; 

            
    }    
}  
 
        if (gameSwitch === true) {// flag turned on when game is activated  
                choiceRow.on("click", function () { 
                    topRowContent.hide();    
                    battleArena.show();   
                    graveyardDiv.show();      
                });  
        }       

        if (gameSwitch === true)  {
            characterDiv.on("click", function(event){
                characterHeading.hide(); 
                enemyHeading.show();      
                choosePlayer();    
            });  
        }   

        attackButton.on("click", function () {  // function called for everytime click event or 'attack occurs'
            enemyHealth = enemyHealth -= characterAttack;
            gameState();    
        });  
 