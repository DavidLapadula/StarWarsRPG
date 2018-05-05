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

// character values stored as data properties on each character div with 'data' class
var darthVaderData = $("#darth-vader-data").data("dataProperties", {name: 'Darth Vader', health: 80, attack: 5, counter: 8});
var yodaData = $("#yoda-data").data("dataProperties", {name: 'Yoda', health: 120    , attack: 8, counter: 10,});
var obiWanData = $("#obi-wan-data").data("dataProperties", {name: 'Obi Wan',health: 140, attack: 4, counter: 7,});
var hanSoloData = $("#han-solo-data").data("dataProperties", {name: 'Han Solo', health: 100, attack: 8, counter: 5,});  
 
// logic and flags for game play
var kills = '0'; 
var newEnemy;  
var newCharacter; 

//initial div values
battleArena.hide(); 
graveyardDiv.hide();  
enemyHeading.hide();   
replayButton.hide();           

// Functions used during the game

var reset = function () {

}

var gameOver = function () {

}

var hasChildren = function (divTest) { // takes one parameter, tests if the argument passed has any children
    if (divTest.children().length > 0) {
        return true; 
    } else {
        return false;   
    }
}  

var killedEnemy = function () {
    enemyLive.text('DEFEATED'); 
    newEnemy.css({border: '0.25em solid #ff0000'}).animate({opacity: "0.5", }, 2000, "linear", function() {graveyard.append(newEnemy);});     
    if (kills < 3) {  
        attackText.text("You Defeated " + enemyName + " !")
        defendText.text("");    
        resultText.text('AWAITING NEXT ENEMY'); 
        attackButton.attr('disabled', true); 
    } else if (kills >= 3) {    
        attackText.text("You Defeated " + enemyName + "!")
        defendText.text(" You have won the game ! ");   
        resultText.text("");  
        choiceRow.append(newCharacter); 
        enemyHeading.text("WINNER");  
       
    }
}              

var gotKilled = function () {
    resultText.text("You have been defeated by " + enemyName); 
    defendText.text("Press Replay to Try again");
    attackText.text("");     
    enemyLive.text("CHAMPION");       
    enemyHeading.text("UNCHALLENGED");    
    characterLive.text('DEFEATED'); 
    newCharacter.css({border: '0.25em solid #ff0000'});         
}      

var choosePlayer = function  ()  {
    if (!hasChildren(activePlayer)) {
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
    } else if  (hasChildren(activePlayer) && !hasChildren(activeDefender)) {
        resultText.text('ATTACK ACTIVE'); 
        var enemyChosen = event.target; 
        newEnemy = $(enemyChosen)// make jquery object from target so can use methods on it later
        enemyLive = newEnemy.find('.data');  // data class of 'p' element. It carries the data values of the character and is updated based on score
        enemyHealth = enemyLive.data("dataProperties").health; 
        enemyAttack = enemyLive.data("dataProperties").attack; 
        enemyCounter = enemyLive.data("dataProperties").counter; 
        enemyName = enemyLive.data("dataProperties").name; 
        attackButton.attr('disabled', false);      
        activeDefender.append(newEnemy);   
        activeDefender.children().addClass('character-defender').removeClass('character-start');    
        }   
};          

 
var gameState = function () {
switch (true) {
    case (enemyHealth < 1 ):
    kills ++; 
    killedEnemy();   
        break;   
    case (characterHealth >= 1 && enemyHealth >= 1):   
        attackText.text("You attacked " + enemyName + " for " + characterAttack + " points !");
        defendText.text(enemyName + " attacked you back for " + enemyCounter + " points !");
        characterHealth = characterHealth -= enemyCounter;
        characterAttack = characterAttack += attackIncrement;   
        characterLive.text(characterHealth); 
        enemyLive.text(enemyHealth); 
            if (characterHealth < 1) {
                gotKilled();  
            }   
            break;   

        }    
}  

        choiceRow.on("click", function () { 
            topRowContent.hide();    
            battleArena.show();   
            graveyardDiv.show();   
                
        });       

        characterDiv.on("click", function(event){
            characterHeading.hide(); 
            enemyHeading.show();      
            choosePlayer();    
        });  
            attackButton.on("click", function () {  // function called for everytime click event or 'attack occurs'
            enemyHealth = enemyHealth -= characterAttack;
            gameState();    
        });  
  
    

