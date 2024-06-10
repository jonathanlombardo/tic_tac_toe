/** Retrieve the first element from moves array
 *
 * @param {Array} moves The moves array
 * @returns {Element} Returns the element
 */
function getFirstBox(moves) {
  const move = moves[0];
  const el = document.querySelector(`.box[data-row="${move.row}"][data-col="${move.col}"]`);
  return el;
}

/** Verify if an element is signed and returns it's sign
 *
 * @param {Element} box The emlement to verify
 * @returns Return sign of element or undefined if unsigned
 */
function isBoxSigned(box) {
  return box.querySelector("[data-sign]")?.dataset.sign;
}

/** Retrieve sign of element from indexes of element
 *
 * @param {Int} row Row index
 * @param {Int} col Col index
 * @returns Return the sign
 */
function getBoxSign(row, col) {
  const box = document.querySelector(`.box[data-row="${row}"][data-col="${col}"]`);
  return isBoxSigned(box);
}

/** Put sign in the provided element
 *
 * @param {Element} el Element to sign
 * @param {String} sign Sign 'X' or 'O' to put in the element
 */
function signBox(el, sign) {
  const signHtml = `<div data-sign="${sign}"></div>`;
  el.innerHTML = signHtml;
  el.classList.add("disabled");
}

/** Remove sign of first move in the moves array
 *
 * @param {Array} moves Array of the moves
 */
function unsignBox(moves) {
  const el = getFirstBox(moves);
  el.classList.remove("flash");
  el.innerHTML = "";
  el.classList.remove("disabled");
  moves.shift();
}

/** Retrive a move object from element signed and it's sign
 *
 * @param {Element} el Element to sign
 * @param {String} sign Sign 'X' or 'O' to put in the element
 * @returns {Object} Returns an object that identify the move
 */
function getMove(el, sign) {
  return {
    row: el.dataset.row,
    col: el.dataset.col,
    sign,
  };
}

/** Switch the param from 'X' to 'O' and viceversa
 *
 * @param {String} sign 'X' or 'O' sign
 * @returns Switched sign
 */
function switchSign(sign) {
  return sign == "X" ? "O" : "X";
}

/** Add a move to the moves array
 *
 * @param {Element} el Signed element
 * @param {String} sign 'X' or 'O' sign
 * @param {Array} moves The array of moves
 *
 */
function addMove(el, sign, moves) {
  // if there's 6 moves or more, remove 1st move
  if (moves.length >= 6) unsignBox(moves);

  // push the move
  moves.push(getMove(el, sign));

  // check game over
  if (isGameOver()) return;

  // if there's 6 moves or more, flashing the 1st move
  if (moves.length >= 6) {
    const el = getFirstBox(moves);
    el.classList.add("flash");
  }
}

/** Check if is gameover and return the winner
 *
 * @returns Return gameover status (winner or undefined)
 */
function isGameOver() {
  // check crosses gameover
  const center = getBoxSign(1, 1);
  if ((center == getBoxSign(0, 0) && center == getBoxSign(2, 2)) || (center == getBoxSign(0, 2) && center == getBoxSign(2, 0))) gameOver = center;

  // check rows/cols gameover
  let i = 0;
  while (i < 3 && !gameOver) {
    let checkRow = true;
    let checkCol = true;
    let n = 0;
    while (n < 2 && (checkRow || checkCol)) {
      checkRow = checkRow && getBoxSign(i, n) == getBoxSign(i, n + 1);
      checkCol = checkCol && getBoxSign(n, i) == getBoxSign(n + 1, i);
      n++;
    }
    gameOver = checkRow ? getBoxSign(i, 0) : checkCol ? getBoxSign(0, i) : undefined;
    i++;
  }

  // return winner or undefined
  console.log({ gameOver });
  if (gameOver) {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.classList.add("disabled");
    });
  }
  return gameOver;
}
