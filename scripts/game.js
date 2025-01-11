function resetGameStatus() {
  activePlayer =0;
  currentRound =1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = '<span id="winner-name">PLAYERNAMEs</span>승리!';
  gameOverElement.style.display = 'none';


  let gameBoardIndex =0;
  for(let i =0; i<3; i++){
    for(let j =0; j<3; j++){
      gameData[i][j] =0;
      const gameBoardItemElement = gameFieldElements[gameBoardIndex];
      gameBoardItemElement.textContent='';
      gameBoardItemElement.classList.remove('disabled');
      gameBoardIndex++;
    }
  }
}


function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Player의 이름을 다시 확인해주세요!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }

    if (
      gameData[0][0] > 0 &&
      gameData[0][0] === gameData[1][1] &&
      gameData[1][1] === gameData[2][2]
    ) {
      return gameData[0][0];
    }

    if (
      gameData[2][0] > 0 &&
      gameData[2][0] === gameData[1][1] &&
      gameData[1][1] === gameData[0][2]
    ) {
      return gameData[2][0];
    }

    if (currentRound === 9) {
      return -1;
    }
  }
  return 0;
}

function swithplayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameIsOver) {
    return;
  }
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("다른 플레이어가 이미 했습니다. 다른 곳을 선택해주세요");
    return;
  }

  selectedField.textContent = players[activePlayer].Symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerID = checkForGameOver();
  console.dir(winnerID);

  if (winnerID !== 0) {
    endGame(winnerID);
  }

  currentRound++;
  swithplayer();
}

function endGame(winnerID) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerID > 0) {
    const winnerName = players[winnerID - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "무승부입니다";
  }
}
