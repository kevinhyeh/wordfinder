 var config = {
     apiKey: "AIzaSyDgbsEY5wVs8byaslFU2ZnvYxX1xm3wwjM",
     authDomain: "bak-game.firebaseapp.com",
     databaseURL: "https://bak-game.firebaseio.com",
     projectId: "bak-game",
     storageBucket: "bak-game.appspot.com",
     messagingSenderId: "792992368200"
 };

 firebase.initializeApp(config);
 var dataRef = firebase.database();

 //welcomepage functions
 $('#correct').hide();
 $('#incorrect').hide();
 $('#gamepage').hide();
 $('#divscoreboard').hide();


 // Easy Mode
 $('#easy').on('click', function() {
     $('.active').removeClass('active');
     $(this).addClass('active');
     $('#gamepage').attr('data-difficulty', 'easy');
     $('#difficultydescription').html("Easy Mode:" + "<br>" + "Solve each level by typing the answer on the keyboard.");
 });

 // Hard Mode
 $('#hard').on('click', function() {
     $('.active').removeClass('active');
     $(this).addClass('active');
     $('#gamepage').attr('data-difficulty', 'hard');
     $('#difficultydescription').html("Hard Mode:" + "<br>" + "Solve each level by clicking the answer on the screen.");
 });

 var timeSeconds = 5;
 var timeSecondsright = 9;
 var timeMinutes = 2;
 var myVar;
 // start timer
 function firstNumber() {
     timeSecondsright--;
     $('#secondsright').text(timeSecondsright);
     if (timeSecondsright == -1) {
         timeSecondsright = 9;
         $('#secondsright').text(timeSecondsright);
         timeSeconds--;
         $('#seconds').text(timeSeconds);
     }
     if (timeSeconds == -1) {
         timeSeconds = 5;
         $('#seconds').text(timeSeconds);
         timeMinutes--;
         $('#minutes').text(timeMinutes);
     }
     if (timeMinutes == -1) {
         $('#gamepage').hide();
         $('#divscoreboard').show();
     }
 }

 function startTimer() {
     $('#secondsright').text(timeSecondsright);
     $('#seconds').text(timeSeconds);
     $('#minutes').text(timeMinutes);

     myVar = setInterval(firstNumber, 1000);
 }

$(document).on('click', '#restartbutton', function() {
    restart();
})


 //Start Button - Start Game
 $('#start').on('click', function() {
     var difficulty = $('#gamepage').attr('data-difficulty');
     if (difficulty.length > 1) {
         $('#welcomepage').hide();
         $('#gamepage').show();
         $('#floatingLetters').hide();
         $('#divtimer div').addClass('bartimer');

         //go to first level
         onLevel();

         // set timer
         timeSeconds = 0;
         timeSecondsright = 0;
         timeMinutes = 3;
         $('#minutes').text(timeMinutes);
         $('#seconds').text(timeSeconds);
         $('#secondsright').text(timeSecondsright);

         // call timer function
         setTimeout(startTimer, 1000);
         if (difficulty == "easy") {
             $('#divtextarea').html("Press the key of the character that's different to move onto the next level" + "<br>" + "You only have 1 guess");
         } else {
             $('#divtextarea').html("Click on the character that's different to move onto the next level");
         }
     } else {
         alert('Choose Difficulty');
     }
 });

 // display current high score
 dataRef.ref().orderByChild("Scores").limitToLast(1).on('child_added', function(snapshot) {
     var newName = snapshot.val().name;
     var newP = snapshot.val().Scores;
     $("#spanhighscore").html(newName + " " + newP);
 });

 $('#enterAnswer').on('click', function() {
     $('#gamepage').hide();
     $('#divscoreboard').show();
 });

 function pause() {
     clearTimeout(myVar);
     $('.bartimer').css('animation-play-state', 'paused');
 };

 $('#pauseTimer').on('click', pause);

 function resume() {
     // call timer function
     setTimeout(startTimer, 1000);
     $('.bartimer').css('animation-play-state', 'running');
 };

 $('#continueTimer').on('click', resume);

 //gamepage functions

 //current level
 var level = 0;
 var myScore = 0;

 function onLevel() {
     $('#playarea').empty();
     level++;
     $('#level').text(level);
     if (level > 5) {
         pause();
         $('#gamepage').hide();
         $('#divscoreboard').show();
         $('#finalscore').text(myScore);
         $('#floatingLetters').show();
         calculateUserScore();
     } else {
         lvlPicker();
     }
 }

 //restart
 function restart() {
     $('#welcomepage').show();
     $('#gamepage').hide();
     $('#floatingLetters').show();
     $('#divscoreboard').hide();
     $('#divtimer div').removeClass('bartimer');
     pause();
     level = 0;
     timeSeconds = 0;
     timeSecondsright = 0;
     timeMinutes = 3;
     $('#minutes').text(timeMinutes);
     $('#seconds').text(timeSeconds);
     $('#secondsright').text(timeSecondsright);
     myScore = 0;
 }

 function correct() {
    $('#correct').show();
    $('#result').html("Correct! click 'ok' to move on to next level.");
    pause();
 }


 function incorrect() {
     $('#incorrect').show();
    $('#inresult').html("Incorrect!");
    pause();
 }


 
 $('#myscore').text(myScore);
 //gameplay style by difficulty


 $('#playarea').on('click', function(e) {
     if ($('#gamepage').attr('data-difficulty') == "hard" && (level > 0 && level < 6)) {
         if (e.target.className == "correctAnswer") {
             myScore += 50;
             $('#myscore').text(myScore);
             
             correct();

         } else {
             

         }
     }
 });

 $(document).keydown(function(e) {
     if ($('#gamepage').attr('data-difficulty') == "easy" && $('#gamepage').css('display') != 'none' && $('#correct').css('display') == 'none' && $('#incorrect').css('display') == 'none') {
         var key = e.key;
         console.log(key)
         
         if (($('.correctAnswer').text().trim().toLowerCase() == key.toLowerCase()) && (level > 0 && level < 6)) {
             myScore += 50;
             $('#myscore').text(myScore);
             
             correct();
             

         } else if (key != 'Enter' && key != 'Meta' && key != 'Alt' && key != 'Control' && key != 'Shift' && key != 'Tab' && key != ' ') {
             incorrect();
         }
     }
 });



 $(document).on('click', '#ok', function() {
    onLevel();
    $('#correct').hide();
    resume();
 });

 $(document).on('click', '#restart', function() {
    $('#incorrect').hide();
    $('#gamepage').hide();
    $('#finalscore').text(myScore);
    $('#divscoreboard').show();
 })

 // Levels
 // BRYANT LEVELS
 function levelOneB() {
     //making <p> tags
     for (var i = 0; i < 3; i++) {
         var p = $('<p>');
         //letters per <p>
         for (var j = 0; j < 5; j++) {
             if (i == 2 && j == 1) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("b ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else {
                 p.append('6 ');
             }
         }

         $('#playarea').append(p);
     }
 }

 function levelTwoB() {
     for (var i = 0; i < 7; i++) {
         var p = $('<p>');
         if (i == 0) {
             for (var j = 0; j < 7; j++) {
                 p.append('m');
             }
         } else if (i == 1) {
             for (var j = 0; j < 10; j++) {
                 p.append('m');
             }
         } else if (i == 2) {
             for (var j = 0; j < 9; j++) {
                 p.append('m');
             }
         } else if (i == 3) {
             for (var j = 0; j < 6; j++) {
                 if (j == 4) {
                     var span = $('<span>');
                     span.text("n");
                     span.addClass('correctAnswer');
                     p.append(span);
                 } else {
                     p.append('m');
                 }
             }
         } else if (i == 4) {
             for (var j = 0; j < 9; j++) {
                 p.append('m');
             }
         } else if (i == 5) {
             for (var j = 0; j < 3; j++) {
                 p.append('m');
             }
         } else if (i == 6) {
             for (var j = 0; j < 7; j++) {
                 p.append('m');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelThreeB() {
     for (var i = 0; i < 6; i++) {
         var p = $('<p>');

         for (var j = 0; j < 15; j++) {

             if (((i == 1) && (j == 1 || j == 4)) || ((i == 5) && (j == 4 || j == 6 || j == 0))) {
                 var span = $('<span>');
                 span.text("O ");
                 span.attr('id', 'blinkNow');
                 p.append(span);
             } else if (((i == 0) && (j == 3 || j == 10)) || (i == 1 && j == 13) || (i == 2 && j == 10) || ((i == 4) && (i == 0 || j == 5))) {
                 var span = $('<span>');
                 span.text("O ");
                 span.attr('id', 'blink');
                 p.append(span);
             } else if (((i == 4) && (j == 7 || j == 14))) {
                 var span = $('<span>');
                 span.text("O ");
                 span.attr('id', 'blinktwo');
                 p.append(span);
             } else if ((i == 2 && j == 3)) {
                 var span = $('<span>');
                 span.text("0 ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else {
                 p.append('O ');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelFourB() {
     for (var i = 0; i < 10; i++) {
         var p = $('<p>');

         for (var j = 0; j < 5; j++) {
             if (i == 0 && j == 2) {
                 var span = $('<span>');
                 span.text("b ");
                 span.attr('id', 'moverightdown');
                 p.append(span);
             } else if ((i == 2 && j == 4) || (i == 9 && j == 4)) {
                 var span = $('<span>');
                 span.text("b ");
                 span.attr('id', 'moveleftup');
                 p.append(span);
             } else if (i == 3 && j == 0) {
                 var span = $('<span>');
                 span.text("b ");
                 span.attr('id', 'moverightup');
                 p.append(span);
             } else if ((i == 5 && j == 2) || (i == 7 && j == 0)) {
                 var span = $('<span>');
                 span.text("b ");
                 span.attr('id', 'moveupdown');
                 p.append(span);
             } else if (i == 8 && j == 2) {
                 var span = $('<span>');
                 span.text("d ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else {
                 p.append('b ');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelFiveB() {
     for (var i = 0; i < 7; i++) {
         var p = $('<p>');

         if (i == 2) {
             p.attr('id', 'movedown');
         } else if (i == 3) {
             p.attr('id', 'rotate');
         }

         for (var j = 0; j < 20; j++) {
             if (((i == 0) && (j == 3 || j == 18)) || (i == 1 && j == 1) || ((i == 3) && (j == 5 || j == 17)) || ((i == 4) && (j == 6 || j == 15)) || ((i == 6) && (j == 4 || j == 16))) {
                 var span = $('<span>');
                 span.text("p ");
                 span.attr('id', 'blinkNow');
                 p.append(span);
             } else if ((i == 0 && j == 9) || ((i == 4) && (j == 0 || j == 3))) {
                 var span = $('<span>');
                 span.text("p ");
                 span.attr('id', 'blinktwo');
                 p.append(span);
             } else if (((i == 1) && (j == 1 || j == 13)) || ((i == 3) && (j == 4 || j == 9 || j == 17)) || ((i == 6) && (j == 3 || j == 7 || j == 13))) {
                 var span = $('<span>');
                 span.text("p ");
                 span.attr('id', 'blinkthree');
                 p.append(span);
             } else if (i == 5 && j == 14) {
                 var span = $('<span>');
                 span.text("q ");
                 span.addClass('correctAnswer');
                 span.attr('id', 'blinkthree');
                 p.append(span);
             } else {
                 p.append('p ');
             }
         }
         $('#playarea').append(p);
     }
 }

 // KEVIN LEVELS
 function levelOneK() {
     //making <p> tags
     for (var i = 0; i < 3; i++) {
         var p = $('<p>');

         for (var j = 0; j < 8; j++) {
             if (i == 0 && j == 1) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("E ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else {
                 p.append('F ');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelTwoK() {
     //making <p> tags
     for (var i = 0; i < 9; i++) {
         var p = $('<p>');
         if (i == 0 || i == 8) {
             //letters per <p>
             for (var j = 0; j < 5; j++) {
                 p.append('S ');
             }
         } else if (i == 1 || i == 7) {
             for (var j = 0; j < 10; j++) {
                 if (i == 1 && j == 8) {
                     //different letter : Answer
                     var span = $('<span>');
                     span.text("5 ");
                     span.addClass('correctAnswer');
                     p.append(span);
                 } else {
                     p.append('S ');
                 }
             }
         } else if (i == 2 || i == 6) {
             for (var j = 0; j < 12; j++) {
                 p.append('S ');
             }
         } else if (i == 3 || i == 5) {
             for (var j = 0; j < 13; j++) {
                 p.append('S ');
             }
         } else {
             for (var e = 0; e < 15; e++) {
                 p.append('S ');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelThreeK() {
     //making <p> tags
     for (var i = 0; i < 11; i++) {
         var p = $('<p>');
         for (var j = 0; j < 16; j++) {
             if ((i == 3 && j == 3) || (i == 8 && j == 10) || (i == 1 && j == 10) || (i == 0 && j == 5)) {
                 var span = $('<span>');
                 span.text("Z ");
                 span.attr('id', 'blinkNow');
                 p.append(span);
             } else if ((i == 1 && j == 2) || (i == 4 && j == 9) || (i == 5 && j == 3) || (i == 7 && j == 5) || (i == 9 && j == 9)) {
                 var span = $('<span>');
                 span.text("Z ");
                 span.attr('id', 'blink');
                 p.append(span);
             } else if ((i == 0 && j == 14) || ((i == 4) && (j == 3 || j == 12)) || (i == 6 && j == 12) || (i == 9 && j == 2) || (i == 10 && j == 6)) {
                 var span = $('<span>');
                 span.text("Z ");
                 span.attr('id', 'blinktwo');
                 p.append(span);
             } else if ((i == 2 && j == 4) || (i == 3 && j == 12) || (i == 8 && j == 0) || (i == 9 && j == 13) || (i == 10 && j == 15)) {
                 var span = $('<span>');
                 span.text("Z ");
                 span.attr('id', 'blinkthree');
                 p.append(span);
             } else if (i == 10 && j == 1) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("2 ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else {
                 p.append('Z ');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelFourK() {
     //making <p> tags
     for (var i = 0; i < 4; i++) {
         var p = $('<p>');
         for (var j = 0; j < 29; j++) {
             if ((i == 2) && (j == 3)) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("l ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else if ((i == 1 && j == 9) || (i == 3 && j == 21)) {
                 var span = $('<span>');
                 span.text("I ");
                 span.attr('id', 'blinkNow');
                 p.append(span);
             } else if ((i == 3 && j == 6)) {
                 var span = $('<span>');
                 span.text("I ");
                 span.attr('id', 'blinktwo');
                 p.append(span);
             } else if ((i == 2 && j == 23)) {
                 var span = $('<span>');
                 span.text("I ");
                 span.attr('id', 'blinkthree');
                 p.append(span);
             } else if ((i == 0 && j == 17) || (i == 1 && j == 3)) {
                 var span = $('<span>');
                 span.text("I ");
                 span.attr('id', 'moverightdown');
                 p.append(span);
             } else if ((i == 1 && j == 28)) {
                 var span = $('<span>');
                 span.text("I ");
                 span.attr('id', 'moveleftup');
                 p.append(span);
             } else {
                 p.append('I ');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelFiveK() {
     var spinDiv = $('<div>');
     spinDiv.attr('id', 'rotateSlow');
     $('#playarea').append(spinDiv);
     //making <p> tags
     for (var i = 0; i < 10; i++) {
         var p = $('<p>');
         for (var j = 0; j < 12; j++) {
             if ((i == 1) && (j == 7)) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("X ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else if ((i == 1 && j == 10) || (i == 4 && j == 2)) {
                 var span = $('<span>');
                 span.text("K ");
                 span.attr('id', 'blinkNow');
                 p.append(span);
             } else if ((i == 1 && j == 4) || (i == 9 && j == 5)) {
                 var span = $('<span>');
                 span.text("K ");
                 span.attr('id', 'blinktwo');
                 p.append(span);
             } else if ((i == 3 && j == 6) || (i == 6 && j == 6) || (i == 8 && j == 6)) {
                 var span = $('<span>');
                 span.text("K ");
                 span.attr('id', 'blinkthree');
                 p.append(span);
             } else if (((i == 1) && (j == 1 || j == 8)) || (i == 2 && j == 3) || (i == 3 && j == 1) || (i == 5 && j == 6) || (i == 6 && j == 2) || (i == 7 && j == 6)) {
                 var span = $('<span>');
                 span.text("K ");
                 span.attr('id', 'moverightdown');
                 p.append(span);
             } else if ((i == 6 && j == 7) || (i == 8 && j == 4) || (i == 9 && j == 7)) {
                 var span = $('<span>');
                 span.text("K ");
                 span.attr('id', 'moveleftup');
                 p.append(span);
             } else {
                 p.append('K ');
             }
         }
         $('#rotateSlow').append(p);
     }
 }

 // AMOLS LEVELS
 function levelOneA() {
     //making <p> tags
     for (var i = 0; i < 4; i++) {
         var p = $('<p>');
         for (var j = 0; j < 9; j++) {
             if ((i == 2) && (j == 7)) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("C");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else {
                 p.append('G');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelTwoA() {
     //making <p> tags
     for (var i = 0; i < 4; i++) {
         var p = $('<p>');
         p.addClass('text-line');
         for (var j = 0; j < 12; j++) {
             if ((i == 2) && (j == 7)) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("V ");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else if (j == 1 || j == 4 || j == 7) {
                 p.append('W ');
             } else {
                 p.append('W');
             }
         }
         $('#playarea').append(p);
     }
 }

 function levelThreeA() {
     //making <p> tags
     for (var i = 0; i < 4; i++) {
         var p = $('<p>');

         if (i == 0) {
             p.addClass('blinking-green');
         } else if (i == 2) {
             p.addClass('blinking-red');
         }

         for (var j = 0; j < 10; j++) {
             if ((i == 2) && (j == 4)) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("8");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else {
                 p.append('6');
             }
         }

         $('#playarea').append(p);

     }
 }

 function levelFourA() {
     //making <p> tags
     for (var i = 0; i < 4; i++) {
         var p = $('<p>');

         if (i == 0 || i == 2) {
             p.addClass('blinking_2sec');
         } else if (i == 3) {
             p.addClass('blinking-red');
         }

         for (var j = 0; j < 12; j++) {
             if ((i == 1) && (j == 9)) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text("N");
                 span.addClass('correctAnswer');
                 p.append(span);
             } else if ((i == 1 && j == 5) || (i == 3 && j == 7)) {

                 var span = $('<span>');
                 span.text("M");
                 span.attr('id', 'moveup');
                 p.append(span);
             } else {
                 p.append('M');
             }
         }

         $('#playarea').append(p);

     }
 }

 function levelFiveA() {
     //making <p> tags
     for (var i = 0; i < 4; i++) {
         var p = $('<p>');

         for (var j = 0; j < 16; j++) {
             if (i == 3 && j == 9) {
                 //different letter : Answer
                 var span = $('<span>');
                 span.text(".");
                 span.addClass('correctAnswer');
                 span.attr('id', 'moveup');
                 p.append(span);
             } else if ((i == 1 && (j >= 0 && j <= 7)) || (i == 3 && j == 8)) {

                 var span = $('<span>');
                 span.text(":");
                 span.attr('id', 'moveup');
                 p.append(span);

             } else if ((i == 0 && (j >= 0 && j <= 5)) || (i == 2 && (j >= 11 && j <= 15))) {

                 var span = $('<span>');
                 span.text(":");
                 span.attr('id', 'movedown');
                 p.append(span);

             } else {
                 p.append(':');
             }
         }

         $('#playarea').append(p);

     }
 }

 // Level picker function
 var lvlOnes = ['levelOneB();', 'levelOneK();', 'levelOneA();'];
 var lvlTwos = ['levelTwoB();', 'levelTwoK();', 'levelTwoA();'];
 var lvlThrees = ['levelThreeB();', 'levelThreeK();', 'levelThreeA();'];
 var lvlFours = ['levelFourB();', 'levelFourK();', 'levelFourA();'];
 var lvlFives = ['levelFiveB();', 'levelFiveK();', 'levelFiveA();'];

 function lvlPicker() {
     var randomlvl = Math.floor(Math.random() * 3);
     if (level == 1) {
         eval(lvlOnes[randomlvl]);
     } else if (level == 2) {
         eval(lvlTwos[randomlvl]);
     } else if (level == 3) {
         eval(lvlThrees[randomlvl]);
     } else if (level == 4) {
         eval(lvlFours[randomlvl]);
     } else if (level == 5) {
         eval(lvlFives[randomlvl]);
     }
 }

 var localTimeMinutes;
var totalScore;
var finalScore;

function calculateUserScore() {

    localTimeMinutes = timeMinutes +  myScore;
    if (timeSeconds >= 5) {
        totalScore = localTimeMinutes + 1;
    }

    $('#finalscore').html(totalScore);
    
}

function insetScoreInToDB() {
    event.preventDefault();
    calculateUserScore();
    name = $("#playerName").val();
    dataRef.ref().push({
        name: name,
        Scores: finalScore
    })
}


 // Initial Values
 var name;

 dataRef.ref().orderByChild("Scores").limitToLast(5).on('child_added', function(snapshot) {
     var newName = $('<p>').text(snapshot.val().name);
     var newP = $('<p>').text(snapshot.val().Scores);
     newName.append(newP)
     $("#divlname").prepend(newName);
 });

 $(document).on("click", "#btn_score", function() {
     // insetScroeInToDB();
     event.preventDefault();
     name = $("#playerName").val();
     score = parseInt($("#playerscore").val());
     dataRef.ref().push({
         name: name,
         Scores: myScore
     });

     $('#divlname').empty();

     dataRef.ref().orderByChild("Scores").limitToLast(5).on('child_added', function(snapshot) {
         var newName = $('<p>').text(snapshot.val().name);
         var newP = $('<p>').text(snapshot.val().Scores);
         newName.append(newP)
         $("#divlname").prepend(newName);
     });
 });