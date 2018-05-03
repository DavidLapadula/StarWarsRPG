$(document).ready(function() {
     
    // reference variables for HTML elements that need to be manipulated
    var topRowContent = $("#top-row-content");    
    var characterHeading = $("#character-heading");     
    var enemyHeading = $("#enemy-heading");     
    var imagesMiddleRow = $("#images-middle-row"); 
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
    var darthVaderData = $("#darth-vader-data").data("dataProperties", {name: 'Darth Vader', health: 250, attack: 10, counter: 5,});
    var yodaData = $("#yoda-data").data("dataProperties", {name: 'Yoda', health: 200, attack: 15, counter: 10,});
    var obiWanData = $("#obi-wan-data").data("dataProperties", {name: 'Obi Wan',health: 150, attack: 25, counter: 15,});
    var hanSoloData = $("#han-solo-data").data("dataProperties", {name: 'Han Solo', health: 100, attack: 30, counter: 20,});  

    // potentiol logic and flags for game play
        var gameSwitch = null; 
        var characterMain = null; 
        var enemyMain = null; 
   
    // Functions used during the game
        var hasChildren = function (divTest) { // takes one parameter, tests if the argument passed has any children
            if (divTest.children().length > 0) {
                return true; 
            } else {
                return false; 
            }
            return x; 
        } 

   
    //initial div values
    battleArena.hide(); 
    graveyardDiv.hide();  
    enemyHeading.hide();                   
    choiceRow.on("click", function () {
        topRowContent.hide();    
        battleArena.show();   
        graveyardDiv.show();   
        gameSwitch = true; 
        characterHeading.text("CHOOSE YOUR CHARACTER");     
            $(characterDiv).click(function(event){
                characterHeading.hide(); 
                enemyHeading.show();    
                gameSwitch = true; 
                    switch (true) { 
                        case (!hasChildren(activePlayer)):
                            var characterChosen = event.target;  //make jquery object from target so can use it for functions later
                            var newCharacter = $(characterChosen); 
                            characterMain = newCharacter;  
                            activePlayer.append(characterMain);  
                            choiceRow.children().addClass('character-enemy'); 
                            choiceRow.children().removeClass('character-start'); 
                            gameSwitch = true; 
                                break; 
                        case (hasChildren(activePlayer) && !hasChildren(activeDefender)):   
                            var enemyChosen = event.target; //make jquery object from target so can use it for functions later 
                            var newEnemy = $(enemyChosen)
                            enemyMain = newEnemy;    
                            activeDefender.append(enemyMain);  
                            activeDefender.children().addClass('character-defender'); 
                            activeDefender.children().removeClass('character-start');   
                         
                    } 
                          
            });  
            if (hasChildren(activePlayer) && hasChildren(activeDefender)) {
                resultText.text('ATTACK ACTIVE') 
                $(attackButton).prop('disabled', false);  
                        characterLive = characterMain.find('.data'); // calling data attributes of character and enemy currently chosen. Flag will be for if anyone is in the graveyard yet
                            characterHealth = characterLive.data("dataProperties").health; 
                            characterAttack = characterLive.data("dataProperties").attack; 
                            characterCounter = characterLive.data("dataProperties").counter; 
                            characterName = characterLive.data("dataProperties").name; 
                                characterLive.text(characterHealth); 
                        enemyLive = enemyMain.find('.data'); 
                            enemyHealth = enemyLive.data("dataProperties").health; 
                            enemyAttack = enemyLive.data("dataProperties").attack; 
                            enemyCounter = enemyLive.data("dataProperties").counter; 
                            enemyName = enemyLive.data("dataProperties").name; 
                                enemyLive.text(enemyHealth);   
              
                attackButton.on("click", function () {  // function called for everytime click event or 'attack occurs'
                    switch (true) {
                        case (characterHealth > 0 && enemyHealth > 0): 
                            attackText.text("You attacked " + enemyName + " for " + characterAttack + " points !")
                            defendText.text(enemyName + " attacked you back for " + enemyCounter + " points !")  
                            characterHealth  = characterHealth -= enemyCounter; 
                            enemyHealth = enemyHealth -= characterAttack; 
                            characterLive.text(characterHealth); 
                            enemyLive.text(enemyHealth); 
                                break; 
                        case (enemyHealth < 1): 
                            graveyard.append(enemyMain);  
                    }
                     
                });   
                       
            }
    
    }); 
 
});  

 