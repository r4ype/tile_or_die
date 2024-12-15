let board;
let score = 0;
let rows = 4;
let columns = 4;


// game start
window.onload = function () {
  loadGame();
};

function loadGame() {
  board = [
    [0, 4, 4, 0],
    [2, 2, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
}

// tile update
function updateTile(tile, num) {
  tile.innerText = "";
  tile.className = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("t" + num.toString());
    }
  }
}


// event listeners
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft" || e.code == "KeyA") {
    moveLeft();
  }
});


//move function
function move(row) {
  row = row.filter(num => num != 0);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }

  row = row.filter(num => num != 0);

  while (row.length < columns) {
    row.push(0);
  }
  console.log(row);
  return row;
}


// moving left right up and down function
function moveLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = move(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
