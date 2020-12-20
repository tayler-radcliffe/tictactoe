const gameState = {
  players: ["X", "O"],
  board: []
};

const winningStates = [
  [true, true, true, 
    false, false, false, 
    false, false, false],

  [false, false, false, 
    true, true, true, 
    false, false, false],

  [false, false, false, 
    false, false, false, 
    true, true, true],

  [true, false, false, 
    true, false, false, 
    true, false, false],

  [false, true, false, 
    false, true, false, 
    false, true, false],

  [false, false, true, 
    false, false, true, 
    false, false, true],

  [true, false, false, 
    false, true, false, 
    false, false, true],

  [false, false, true, 
    false, true, false, 
    true, false, false],
];

let isPlayerOnesTurn = true;
let currentPlayer = isPlayerOnesTurn ? gameState.players[0] : gameState.players[1];

function recordTurn(player, index) {
    gameState.board.push({
        player,
        indexOfMove: index
    })
}

function startGame() {
  $(".start-game").on("click", function () {
    $(".player-turn").show();
    $(".start").hide();
    const playerOne = $(".player-one").val();
    const playerTwo = $(".player-two").val();
    $(".player-names").append($(`<div>${playerOne} is X's</div>`));
    $(".player-names").append($(`<div>${playerTwo} is O's</div>`));
    $(".player-turn").text(playerOne + "'s turn to move.");

    function currentPlayerMove() {
      $(".grid .cell").one("click", function () {
        let currentPlayer = isPlayerOnesTurn
          ? gameState.players[0]
          : gameState.players[1];

        $(this).data("player", currentPlayer);
        recordTurn(currentPlayer, $(this)[0].id);

        if (isPlayerOnesTurn == true) {
          $(".player-turn").text(playerTwo + "'s turn to move.");
          $(this).text(currentPlayer).css('color', 'red');
          isPlayerOnesTurn = false;
        } else {
          $(".player-turn").text(playerOne + "'s turn to move.");
          $(this).text(currentPlayer).css('color', 'blue');;
          isPlayerOnesTurn = true;
        }

        if (checkWin(currentPlayer)) {
          alertWin(currentPlayer);
          $(".player-turn").hide();
          $(".cell").off("click");
        }

        if (checkDraw()) {
          alertDraw();
          $(".player-turn").hide();
          $(".cell").off("click");
        }
      });
    }
    currentPlayerMove();
  });
}

startGame();

function checkWin(possibleVictor) {
    const playerMoves = gameState.board
        .filter((turn) => possibleVictor === turn.player)

    if (playerMoves.length < 3) return false;

    return winningStates.some((winningState) => {
        let matches = 0;
        let hasWon = false;

        playerMoves.forEach((move) => {
            if (winningState[move.indexOfMove]) {
                matches++

                if (matches === 3) {
                    hasWon = true
                }
            }
        })
        return hasWon
    })
}

function checkDraw() {
    const isMaxNumberOfMoves = gameState.board.length === 9
    const didXWin = checkWin(gameState.players[0])
    const didYWin = checkWin(gameState.players[1])

    return !didXWin && !didYWin && isMaxNumberOfMoves

}

function alertWin(possibleVictor) {
  let alertBox = $("#alert");
  alertBox.find(".message").text(possibleVictor + " wins!");
  alertBox.show();
  alertBox.find(".restart").click(function () {
    $("#alert").hide();
  });
}

function alertDraw() {
  let alertBox = $("#alert");
  alertBox.find(".message").text("It's a Draw!");
  alertBox.show();
  alertBox.find(".restart").click(function () {
    alertBox.hide();
  });
}

function restartGame() {
  $(".restart").click(function () {
    $(".start").show();
    $(".cell").empty();
    $(".player-turn").empty();
    $(".player-names").empty();
    $(".cell").on("click");
    isPlayerOnesTurn = true;
    gameState.board = []
  });
}

restartGame();

// function playWithComputer() {
//     $(".computer").on("click", function () {
//       $(".player-turn").show();
//       $(".start").hide();
//       $(".player-names").append($(`<div>You are X's</div>`));
//       $(".player-names").append($(`<div>Computer is O's</div>`));
//       $(".player-turn").text("Your turn to move.");
  
//       function currentPlayerMove() {
//         $(".grid .cell").one("click", function () {
//           let currentPlayer = isPlayerOnesTurn
//             ? gameState.players[0]
//             : gameState.players[1];
  
//           $(this).data("player", currentPlayer);
//           recordTurn(currentPlayer, $(this)[0].id);
  
//           if (isPlayerOnesTurn == true) {
//             $(".player-turn").text("Computer's turn to move.");
//             computerTurn();
//           } else {
//             $(".player-turn").text("Your turn to move.");
//             $(this).text(currentPlayer);
//             isPlayerOnesTurn = true;
//           }
  
//           if (checkWin(currentPlayer)) {
//             alertWin(currentPlayer);
//             $(".player-turn").hide();
//             $(".cell").off("click");
//           }
  
//           if (checkDraw()) {
//             alertDraw();
//             $(".player-turn").hide();
//             $(".cell").off("click");
//           }
//         });
//       }
//       currentPlayerMove();
//     });
//   }

// playWithComputer();


// function computerTurn () {
//     const randomNumber =  Math.floor(Math.random() * 9);
//         gameState.board.push({
//             currentPlayer,
//             indexOfMove: randomNumber
//         })
//     isPlayerOnesTurn = false;
// }
