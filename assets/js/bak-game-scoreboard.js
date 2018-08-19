// Initialize Firebase
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
// Initial Values
var name;
var score;

dataRef.ref().orderByChild("Scores").limitToLast(5).on('child_added', function(snapshot) {
    var newName = $('<p>').text(snapshot.val().name);
    var newP = $('<p>').text(snapshot.val().Scores);
    newName.append(newP)
    $("#divlname").html(newName);
});

$(document).on("click", "#btn_score", function() {
    // event.preventDefault();
    // name = $("#playerName").val();
    // score = parseInt($("#playerscore").val());
    // dataRef.ref().push({
    //     name: name,
    //     Scores: score
    // });

    // $('#divlname').empty();

    // dataRef.ref().orderByChild("Scores").limitToLast(5).on('child_added', function(snapshot) {
    //     var newName = $('<p>').text(snapshot.val().name);
    //     var newP = $('<p>').text(snapshot.val().Scores);
    //     newName.append(newP)
    //     $("#divlname").prepend(newName);
    // });
    alert("hi")
});