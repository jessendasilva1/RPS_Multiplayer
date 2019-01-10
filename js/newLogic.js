// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyB86s5uF5bqvsP2wD2hhs0DOyMWTgSRy7o",
    authDomain: "rps-multiplayer-f0362.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-f0362.firebaseio.com",
    projectId: "rps-multiplayer-f0362",
    storageBucket: "rps-multiplayer-f0362.appspot.com",
    messagingSenderId: "1080320608207"
};
firebase.initializeApp(config);
var database = firebase.database();

function start() {
    let playerKeyExists = localStorage.getItem("playerKey");

    // if the user does not have a key, they will be prompted to enter a user name and will be assigned a key
    if (playerKeyExists === null) {
        $('#myModal').modal('show');
    }
}

// new user key creation and player profile creation
$("#acceptName").on("click", function (event) {
    event.preventDefault();
    let playerKey = localStorage.getItem("playerKey") || database.ref('players').push().key;
    //console.log(playerKey);
    let newPlayer = {};
    playerName = $("#playerUserName").val().trim();
    if (playerName !== "") {
        // storing our unique key in our local storage
        localStorage.setItem("playerKey", playerKey);
        newPlayer[playerKey] = {
            name: playerName,
            wins: 0,
            losses: 0,
            ties: 0
        }
        let game = database.ref('game');
        game.once("value", function (snapshot) {
            let sv = snapshot.val();
            database.ref('players').update(newPlayer);
        })
        $('#modalErrorMessage').empty();
        $("#modalErrorMessage").append(`
            <p style="color: green;" id="modalErrorMessage" class="mb-1">Success</p>`);
        $("#myModal").modal('hide');

    } else {
        $('#modalErrorMessage').empty();
        $("#modalErrorMessage").append(`
            <p style="color: red;" id="modalErrorMessage" class="mb-1">Please Enter a Valid Username</p>
        `);

    }
})

$(".gameButtons").on("click", function (event) {
    let elementID = event.currentTarget.id;
    let gameRef = database.ref('game');
    gameRef.once('value', function (snapshot) {
        if (elementID === "joinPlayer1") {

        } else if (elementID === "joinPlayer2") {

        } else if (elementID === "leavePlayer1") {

        } else if (elementID === "leavePlayer2") {

        }
    })
    //console.log(event.currentTarget.id);
})

$(window).on('resize', function () {
    var win = $(this);
    if (win.width() < 400) {
        $("#playersDiv").removeClass('flex-row');
        $("#playersDiv").addClass('flex-column');
    } else if (win.width() > 400) {
        $("#playersDiv").removeClass('flex-column');
        $("#playersDiv").addClass('flex-row');
    }
});


















/*

function start() {
    let playerKeyExists = localStorage.getItem("playerKey");
    let dbRef = database.ref('game');

    if (playerKeyExists === null) {
        $('#myModal').modal('show');
    } else {
        let playerNameDB = database.ref('players/' + playerKeyExists);


        playerNameDB.once("value", function (snapshot) {
            let sv = snapshot.val();
            console.log(snapshot.val());
            $("#player1Name").text(sv.name);
        })

        /*
        dbRef.once('value', function (snapshot) {
        	let sv = snapshot.val();
        	let otherPlayer = sv.player1;
        	if (otherPlayer.name !== "") {
        		console.log();
        		$("#player2Name").text(otherPlayer.name);
        	}
        })
    }

    let temp4 = database.ref('game');
    temp4.on('value', function (snapshot) {

        if (snapshot.val() !== "") {
            let sv = snapshot.val();
            let name = Object.keys(sv);
            let displayName = sv[name[0]].name;
            console.log(displayName);
            $("#player2Name").text(displayName);
        }
    })

    console.log("rock paper scissors is awesome!!");
}

$("#acceptName").on("click", function (event) {
    event.preventDefault();
    let playerKey = localStorage.getItem("playerKey") || database.ref('players').push().key;
    console.log(playerKey);
    let newPlayer = {};
    console.log("update this shit");
    playerName = $("#playerUserName").val().trim();
    if (playerName !== "") {
        // creating our player
        localStorage.setItem("playerKey", playerKey);
        newPlayer[playerKey] = {
            name: playerName,
            wins: 0,
            losses: 0,
            ties: 0
        }
        let temp = database.ref('game');
        checkGamePlayers(temp, newPlayer);
    } else {

    }
})

function checkGamePlayers(DB, newPlayer) {
    console.log(newPlayer.key);
    DB.once("value", function (snapshot) {
        let game = snapshot.val();

        // if there is no player in the game, add to player 1 (or player 2), else just add to player list
        if (game.player1 === "" && game.player2 === "") {
            console.log('no players in the game');
            $("#player1Name").text(playerName);
            return database.ref('game').update({
                player1: newPlayer
            }), database.ref('players').update(newPlayer);
        } else if (game.player1 !== "" && game.player2 === "") {
            console.log('add to the second player in the game');
            $("#player2Name").text(playerName);
            return database.ref('game').update({
                player2: newPlayer
            }), database.ref('players').update(newPlayer);
        }
        // both player spots in the game are occupied
        else {
            //just add to players list (add game joining later)
            console.log('game is full, only adding to player list');
            $("#player1Name").text(playerName);
            return database.ref('players').update(newPlayer);
        }

    })
}



$("#sendChat").on("click", function (event) {
    console.log("update this shit");
    /*
    playerName = $("#playerUserName").val().trim();
    database.ref('game').push({
    	player1Name: playerName
    })
    $("#player1Name").text(playerName);
    
})

$(window).on('resize', function () {
    var win = $(this);
    if (win.width() < 400) {
        $("#playersDiv").removeClass('flex-row');
        $("#playersDiv").addClass('flex-column');
    } else if (win.width() > 400) {
        $("#playersDiv").removeClass('flex-column');
        $("#playersDiv").addClass('flex-row');
    }
});*/