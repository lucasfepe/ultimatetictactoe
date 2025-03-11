const start = () => {
  for (let i = 0; i < 9; i++) {
    const outer = document.createElement("div");
    outer.classList.add("outer");
    outer.classList.add("on");

    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        const div = document.createElement("div");
        div.classList.add(`ttt-${i}`);
        div.addEventListener("click", (e) => {
          if (e.target.innerHTML !== "") return;
          if (!e.target.parentNode.classList.contains("on")) return;
          const text = Xturn ? "X" : "O";
          e.target.innerHTML = text;
          if (
            checkMiniGame(
              e.target.classList[0],
              Array.from(e.target.parentNode.children).indexOf(e.target)
            )
          ) {
            e.target.parentNode.innerHTML = text;
            checkGame();
          }
          Xturn = !Xturn;
        });
        outer.appendChild(div);
      }
    }
    document.body.appendChild(outer);
  }
};

const checkMiniGame = (className, idx) => {
  const outers = document.getElementsByClassName("outer");

  if (outers[idx].classList.contains("done")) {
    for (let i = 0; i < outers.length; i++) {
      if (!outers[i].classList.contains("done")) outers[i].classList.add("on");
    }
  } else {
    for (let i = 0; i < outers.length; i++) {
      outers[i].classList.remove("on");
    }
    outers[idx].classList.add("on");
  }

  const els = document.getElementsByClassName(className);
  const plays = [];
  for (var i = 0; i < els.length; i++) {
    plays.push(els[i].innerHTML);
  }
  if (
    (plays[0] === plays[1] && plays[1] === plays[2] && plays[0] !== "") ||
    (plays[3] === plays[4] && plays[4] === plays[5] && plays[3] !== "") ||
    (plays[6] === plays[7] && plays[7] === plays[8] && plays[6] !== "") ||
    (plays[0] === plays[3] && plays[3] === plays[6] && plays[0] !== "") ||
    (plays[1] === plays[4] && plays[4] === plays[7] && plays[1] !== "") ||
    (plays[2] === plays[5] && plays[5] === plays[8] && plays[2] !== "") ||
    (plays[0] === plays[4] && plays[4] === plays[8] && plays[0] !== "") ||
    (plays[2] === plays[4] && plays[4] === plays[6] && plays[2] !== "")
  ) {
    els[0].parentNode.classList.add("done");

    return true;
  }
  return false;
};

const checkGame = () => {
  const els = document.getElementsByClassName("outer");
  const plays = [];
  for (var i = 0; i < els.length; i++) {
    if (!els[i].classList.contains("done")) plays.push("");
    else plays.push(els[i].innerHTML);
  }
  if (
    (plays[0] === plays[1] && plays[1] === plays[2] && plays[0] !== "") ||
    (plays[3] === plays[4] && plays[4] === plays[5] && plays[3] !== "") ||
    (plays[6] === plays[7] && plays[7] === plays[8] && plays[6] !== "") ||
    (plays[0] === plays[3] && plays[3] === plays[6] && plays[0] !== "") ||
    (plays[1] === plays[4] && plays[4] === plays[7] && plays[1] !== "") ||
    (plays[2] === plays[5] && plays[5] === plays[8] && plays[2] !== "") ||
    (plays[0] === plays[4] && plays[4] === plays[8] && plays[0] !== "") ||
    (plays[2] === plays[4] && plays[4] === plays[6] && plays[2] !== "")
  ) {
    alert("Game Over winner: " + (Xturn ? "X" : "O"));
    location.reload();
  }
};

let Xturn = true;
start();
