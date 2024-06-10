const moves = [];
let gameOver;
let currentSign = "X";

const boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (isBoxSigned(this)) return;
    if (gameOver) return;
    signBox(this, currentSign);
    addMove(this, currentSign, moves);
    currentSign = switchSign(currentSign);
  });
});
