function initGlobalsVar() {
  moves = [];
  gameOver = undefined;
  currentSign = "X";
}

/** Generate the game grid inside element
 *
 * @param {Element} el Gameboard element
 */
function generateGrid(el) {
  let gridHtml = "";
  for (let i = 0; i < 3; i++) {
    gridHtml += `<div class="row">`;
    for (let n = 0; n < 3; n++) {
      gridHtml += `<div class="box" data-row="${i}" data-col="${n}"></div>`;
    }
    gridHtml += `</div>`;
  }
  el.innerHTML = gridHtml;
}

/** Ad click listener to each box
 *
 * @param {Array} boxes Array of boxes elements
 */
function setListeners(boxes) {
  boxes.forEach((box) => {
    box.addEventListener("click", function () {
      if (isBoxSigned(this)) return;
      if (gameOver) return;
      signBox(this, currentSign);
      addMove(this, currentSign, moves);
      currentSign = switchSign(currentSign);
    });
  });
}

function initNewGame() {
  // Init global vars
  initGlobalsVar();

  // Generate game board
  const mainEl = document.querySelector("main");
  const gameboardEl = document.createElement("div");

  // Generate the grid
  generateGrid(gameboardEl);

  // Put gameboard on page
  mainEl.append(gameboardEl);

  // Set all click listeners on grid
  const boxes = document.querySelectorAll(".box");
  setListeners(boxes);
}
