document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".tile");
  const displayText = document.querySelector(".turn");
  const resetBtn = document.querySelector("#reset");
  const statusTxt = document.querySelector(".status");

  // game
  /* indexs
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

  const bigWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // for each tile
  let options = ["", "", "", "", "", "", "", "", ""];

  let currentPlayer = "X";
  let running = false;

  initializeGame();

  function initializeGame() {
    //   * add a index for each tile
    let index = 0;
    for (const tile of tiles) {
      tile.dataset.index = index++;
    }

    tiles.forEach(function (tile) {
      tile.addEventListener("click", tileClicked);
    });

    resetBtn.addEventListener("click", restartGame);
    displayText.textContent = `${currentPlayer}`;
    running = true;
  }

  function tileClicked(event) {
    // * catch index from clicked element
    const tile = event.target;
    const index = tile.dataset.index;

    if (index === undefined || options[index] !== "" || !running) {
      return;
    }

    updateTile(tile, index);
    checkWinner();
  }

  function updateTile(tile, index) {
    options[index] = currentPlayer;
    tile.textContent = currentPlayer;
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayText.textContent = `${currentPlayer}`;
  }

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < bigWin.length; i++) {
      const condition = bigWin[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if (cellA === "" || cellB === "" || cellC === "") {
        continue;
      }
      if (cellA === cellB && cellB === cellC) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusTxt.textContent = `${currentPlayer} wins!`;
      statusTxt.classList.remove("d-none");
      running = false;
    } else if (!options.includes("")) {
      statusTxt.textContent = "Draw!";
      statusTxt.classList.remove("d-none");
      running = false;
    } else {
      changePlayer();
    }
  }

  function restartGame() {
    currentPlayer = "X";
    displayText.textContent = currentPlayer;
    options = ["", "", "", "", "", "", "", "", ""];
    statusTxt.classList.add("d-none");
    tiles.forEach((tile) => {
      tile.textContent = "";
    });
    running = true;
  }
});
