$(document).ready(function() {
    
    // reference variables for HTML elements that need to be manipulated
    var mainContent = $("#main-content"); 
    var topRowContent = $("#top-row-content"); 
    var mainContent = $("#main-content");     
    var characterHeading = $("#character-heading");     
    var imagesMiddleRow = $("#images-middle-row"); 
    var choiceRow = $("#choice-row"); 
    var characterImage = $(".character-image"); 
    var yoda = $("#yoda"); 
    var darthVader = $("#darth-vader"); 
    var obiWan = $("#obi-wan")
    var hanSolo = $("#han-solo"); 
    var battleArena = $("#battle-arena"); 
    var characterShip = $("#character-ship"); 
    var defenderShip = $("#defender-ship"); 
    var attackText= $("#attack-text"); 
    var defendText= $("#defend-text");  
    var attackButton = $("#attack-button"); 
    var graveyard = $("#graveyard"); 
    var replayButton = $("#replay-button"); 

    // value counters
    var darthVaderData = $("#darth-vader-data").data("dataAttr", { health: 0, attack: 0, counterAttack: 0,});
    var yodaData = $("#yoda-data").data("dataAttr", { health: 0, attack: 0, counterAttack: 0,});
    var obiWanData = $("#obi-wan-data").data("dataAttr", { health: 0, attack: 0, counterAttack: 0,});
    var hanSoloData = $("#han-solo-data").data("dataAttr", { health: 0, attack: 0, counterAttack: 0,});  

    // logic and flags for game play
    var initialSwitch = true; 
    var gameOnSwitch = null; 

    //initial div values
    battleArena.hide(); 
    graveyard.hide();   
  
    choiceRow.on("click", function () {
       topRowContent.hide(); 
       characterHeading.text("FIGHT SECTION: ENEMIES AVAILABLE"); 
    });


});   