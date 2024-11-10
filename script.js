const easyBtn = document.querySelector("#easyBtn");
const hardBtn = document.querySelector("#hardBtn");
const startGameBtn = document.querySelector("#startGameBtn");
const rulesBtn = document.querySelector("#rulesBtn");
const grid = document.querySelector("#gameGrid");
const routeDesigner = document.querySelector("#routeDesigner");
const time = document.querySelector("#time");
const introScreen = document.querySelector("#introScreen");
const gameScreen = document.querySelector("#gameScreen");
const nameInput = document.querySelector("#nameInput");
const leaderboardResults = document.querySelector("#leaderboardResults");
const leaderboardScreen = document.querySelector("#leaderboardScreen");
const playAgainBtn = document.querySelector("#playAgainBtn");
const rulesScreen = document.querySelector("#rulesScreen");
const showLeaderboardBtn = document.querySelector("#showLeaderboardBtn");
const closableModal = document.querySelectorAll(".closable");
let seconds = 0;
let interval;

const easyLevels = [
  {
    "1,2": "mountain3",
    "1,5": "oasis",
    "2,4": "bridgeY",
    "2,5": "oasis",
    "3,1": "bridgeY",
    "3,3": "mountain2",
    "4,4": "oasis",
    "5,3": "mountain1",
  },
  {
    "1,1": "oasis",
    "1,3": "bridgeX",
    "2,2": "mountain2",
    "2,5": "mountain2",
    "3,1": "bridgeY",
    "3,2": "oasis",
    "3,3": "mountain1",
    "4,4": "oasis",
  },
  {
    "1,3": "bridgeX",
    "2,5": "bridgeY",
    "3,2": "mountain2",
    "3,3": "bridgeY",
    "4,2": "oasis",
    "5,2": "bridgeX",
    "5,5": "mountain2",
  },
  {
    "1,4": "bridgeX",
    "3,1": "bridgeY",
    "3,3": "mountain3",
    "3,5": "mountain3",
    "5,3": "oasis",
    "5,4": "mountain1",
  },
  {
    "1,3": "bridgeX",
    "2,2": "mountain4",
    "3,1": "bridgeY",
    "3,4": "mountain1",
    "4,3": "bridgeY",
    "4,4": "oasis",
    "5,2": "mountain2",
  },
];

const hardLevels = [
  {
    "1,2": "mountain3",
    "1,3": "oasis",
    "1,4": "oasis",
    "1,6": "bridgeX",
    "2,1": "bridgeY",
    "3,3": "bridgeY",
    "4,4": "mountain1",
    "5,1": "mountain1",
    "5,3": "mountain3",
    "5,5": "bridgeX",
    "5,7": "oasis",
    "7,4": "bridgeX",
  },
  {
    "1,3": "oasis",
    "2,1": "bridgeY",
    "2,3": "bridgeX",
    "2,6": "mountain2",
    "3,3": "bridgeX",
    "3,7": "bridgeY",
    "4,1": "mountain4",
    "5,2": "oasis",
    "5,4": "mountain3",
    "6,2": "mountain4",
    "7,3": "oasis",
  },
  {
    "1,3": "bridgeX",
    "2,7": "bridgeY",
    "3,1": "oasis",
    "3,3": "mountain1",
    "5,2": "oasis",
    "5,3": "mountain1",
    "5,5": "bridgeX",
    "6,1": "bridgeY",
    "6,6": "mountain3",
    "7,3": "oasis",
    "7,4": "mountain1",
  },
  {
    "2,4": "bridgeY",
    "2,6": "mountain2",
    "3,3": "mountain1",
    "4,2": "bridgeX",
    "4,4": "oasis",
    "4,6": "bridgeX",
    "5,3": "mountain2",
    "5,5": "mountain3",
    "6,1": "bridgeY",
    "6,6": "mountain1",
  },
  {
    "2,6": "mountain4",
    "3,2": "bridgeX",
    "3,3": "bridgeX",
    "3,5": "mountain3",
    "5,3": "mountain4",
    "5,5": "oasis",
    "6,2": "mountain2",
    "6,4": "bridgeY",
  },
];

const bridgeXBlockArray = ["bridgeX", "bridge_railX"];
const bridgeYBlockArray = ["bridgeY", "bridge_railY"];
const mountain1BlockArray = ["mountain1", "mountain_rail1"];
const mountain2BlockArray = ["mountain2", "mountain_rail2"];
const mountain3BlockArray = ["mountain3", "mountain_rail3"];
const mountain4BlockArray = ["mountain4", "mountain_rail4"];

const blockElem = (block, id) =>
  `<img src='images/blocks/${block}.png' class='block bg-primary' data-blockid='${id}' data-current='${block}' data-block='${block}' data-pointers='' draggable='false'/>`;

const leaderboardElem = (index, name, block, time) =>
  `<div class="flex gap-2"><span>${index}</span><span class="flex-1">${name}</span><span class="px-2">${block}</span><span class="px-2">${formatTime(
    time
  )}</span></div>`;

function toggleDifficulty(event) {
  const elemId = event.target.id;
  if (elemId === "easyBtn") {
    easyBtn.setAttribute("aria-selected", "true");
    hardBtn.removeAttribute("aria-selected");
  } else {
    hardBtn.setAttribute("aria-selected", "true");
    easyBtn.removeAttribute("aria-selected");
  }
}

function getLevel() {
  return easyBtn.getAttribute("aria-selected") === "true" ? 5 : 7;
}

function addBlocks(a) {
  grid.classList.add(`grid-cols-${a}`);
  const toTake = a === 5 ? easyLevels : hardLevels;
  const level = toTake[Math.floor(Math.random() * toTake.length)];
  for (let rowIndex = 1; rowIndex <= a; rowIndex++) {
    for (let colIndex = 1; colIndex <= a; colIndex++) {
      let block = level[rowIndex + "," + colIndex];
      if (!block) {
        block = "empty";
      }
      grid.innerHTML += blockElem(block, rowIndex + "," + colIndex);
    }
  }
}

function formatTime(seconds) {
  return (
    Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (seconds % 60).toString().padStart(2, "0")
  );
}

function updateTimer() {
  seconds += 1;
  time.textContent = formatTime(seconds);
}

function startGame(e) {
  e.preventDefault();
  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  addBlocks(getLevel());
  interval = window.setInterval(updateTimer, 1000);
}

function changeName(e) {
  routeDesigner.textContent = e.target.value;
}

const emptyBlockArray = [
  "empty",
  "straight_railX",
  "straight_railY",
  "curve_rail1",
  "curve_rail2",
  "curve_rail3",
  "curve_rail4",
];

function updateBlock(elem, block) {
  elem.src = "images/blocks/" + block + ".png";
  elem.dataset.current = block;
  elem.dataset.pointers = getPointers(elem, block);
}

function toggleBlock(arr, current) {
  return arr[(arr.indexOf(current) + 1) % arr.length];
}

function getPointers(elem, block) {
  const index = elem.dataset.blockid.split(",").map(Number);
  switch (block) {
    case "straight_railY":
      return (
        index[0] + 1 + "," + index[1] + ";" + (index[0] - 1) + "," + index[1]
      );
    case "straight_railX":
      return (
        index[0] + "," + (index[1] + 1) + ";" + index[0] + "," + (index[1] - 1)
      );
    case "bridge_railY":
      return (
        index[0] + 1 + "," + index[1] + ";" + (index[0] - 1) + "," + index[1]
      );
    case "bridge_railX":
      return (
        index[0] + "," + (index[1] + 1) + ";" + index[0] + "," + (index[1] - 1)
      );
    case "curve_rail1":
      return (
        index[0] + "," + (index[1] + 1) + ";" + (index[0] - 1) + "," + index[1]
      );
    case "curve_rail2":
      return (
        index[0] + "," + (index[1] - 1) + ";" + (index[0] - 1) + "," + index[1]
      );
    case "curve_rail3":
      return (
        index[0] + "," + (index[1] - 1) + ";" + (index[0] + 1) + "," + index[1]
      );
    case "curve_rail4":
      return (
        index[0] + "," + (index[1] + 1) + ";" + (index[0] + 1) + "," + index[1]
      );
    case "mountain_rail1":
      return (
        index[0] + "," + (index[1] + 1) + ";" + (index[0] - 1) + "," + index[1]
      );
    case "mountain_rail2":
      return (
        index[0] + "," + (index[1] - 1) + ";" + (index[0] - 1) + "," + index[1]
      );
    case "mountain_rail3":
      return (
        index[0] + "," + (index[1] - 1) + ";" + (index[0] + 1) + "," + index[1]
      );
    case "mountain_rail4":
      return (
        index[0] + "," + (index[1] + 1) + ";" + (index[0] + 1) + "," + index[1]
      );
    default:
      return "";
  }
}

function addToLeaderboard(name, block, time) {
  const leaderboard = [...getLeaderboard(), { name, block, time }].sort(
    (a, b) => a.time - b.time
  );
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function getLeaderboard() {
  return JSON.parse(localStorage.getItem("leaderboard") || "[]");
}

function showLeaderboard(fromGame = false) {
  leaderboardScreen.classList.remove("hidden");
  leaderboardScreen.classList.add("fadeIn");
  leaderboardScreen.classList.remove("opacity-0");
  if (fromGame) {
    leaderboardScreen.querySelector("h2").innerHTML = `Congratulations, ${
      nameInput.value || "Player 1"
    } <br /> you won in ${time.textContent}!`;
    leaderboardScreen.classList.remove("closable");
    leaderboardScreen.querySelector("h3").classList.add("mt-5");
    playAgainBtn.classList.remove("hidden");
  } else {
    leaderboardScreen.querySelector("h3").classList.remove("mt-5");
    playAgainBtn.classList.add("hidden");
    leaderboardScreen.classList.add("closable");
  }
  leaderboardResults.innerHTML = getLeaderboard()
    .map((entry, i) =>
      leaderboardElem(i + 1, entry.name, entry.block, entry.time)
    )
    .join("");
}

function wonTheGame() {
  clearInterval(interval);
  addToLeaderboard(
    nameInput.value || "Player 1",
    getLevel() === 5 ? "5x5" : "7x7",
    seconds
  );
  showLeaderboard(true);
}

function isWinning() {
  let error = false;
  grid.querySelectorAll(".block").forEach((elem) => {
    if (
      [
        "empty",
        "mountain1",
        "mountain2",
        "mountain3",
        "mountain4",
        "bridgeX",
        "bridgeY",
      ].includes(elem.dataset.current)
    ) {
      error = true;
      return;
    }
  });
  if (error) {
    return false;
  }

  const blocks = Array.from(grid.querySelectorAll(".block")).filter(
    (elem) => elem.dataset.current !== "oasis"
  );

  function getElemByBlockId(id) {
    return blocks.find((elem) => elem.dataset.blockid === id);
  }

  const firstBlock = blocks[0].dataset.blockid;

  const visited = new Set();
  let toVisit = firstBlock;

  let i = 0;

  function ifContains(id, toVisit) {
    const pointerElem = getElemByBlockId(id);
    if (!pointerElem) {
      return false;
    }
    return pointerElem.dataset.pointers.split(";").includes(toVisit);
  }

  while (toVisit) {
    visited.add(toVisit);

    const currentBlock = getElemByBlockId(toVisit);
    if (!currentBlock) {
      return false;
    }
    const pointers = currentBlock.dataset.pointers;
    if (!pointers) {
      return false;
    }

    const [pointer1, pointer2] = pointers.split(";");

    let nextBlock = null;
    if (!visited.has(pointer1) && ifContains(pointer1, toVisit)) {
      nextBlock = pointer1;
    } else if (!visited.has(pointer2) && ifContains(pointer2, toVisit)) {
      nextBlock = pointer2;
    }

    if (
      !nextBlock &&
      i > 1 &&
      (pointer1 === firstBlock || pointer2 === firstBlock)
    ) {
      break;
    } else if (!nextBlock) {
      return false;
    }

    toVisit = nextBlock;
    i++;

    if (i > blocks.length * 2) {
      console.log("went into loop");
      return false;
    }
  }

  if (visited.size !== blocks.length) {
    return false;
  }

  return true;
}

function handleGrid(e) {
  const elem = e.target;
  if (!elem.className.includes("block")) {
    return;
  }

  switch (elem.dataset.block) {
    case "empty":
      updateBlock(elem, toggleBlock(emptyBlockArray, elem.dataset.current));
      break;
    case "bridgeX":
      updateBlock(elem, toggleBlock(bridgeXBlockArray, elem.dataset.current));
      break;
    case "bridgeY":
      updateBlock(elem, toggleBlock(bridgeYBlockArray, elem.dataset.current));
      break;
    case "mountain1":
      updateBlock(elem, toggleBlock(mountain1BlockArray, elem.dataset.current));
      break;
    case "mountain2":
      updateBlock(elem, toggleBlock(mountain2BlockArray, elem.dataset.current));
      break;
    case "mountain3":
      updateBlock(elem, toggleBlock(mountain3BlockArray, elem.dataset.current));
      break;
    case "mountain4":
      updateBlock(elem, toggleBlock(mountain4BlockArray, elem.dataset.current));
      break;
    default:
      break;
  }
  isWinning() && wonTheGame();
}

function openRules() {
  rulesScreen.classList.remove("hidden");
  rulesScreen.classList.add("fadeIn");
  rulesScreen.classList.remove("opacity-0");
}

function closeModal(elem) {
  elem.classList.add("hidden");
  elem.classList.remove("fadeIn");
  elem.classList.add("opacity-0");
}

easyBtn.addEventListener("click", toggleDifficulty);
hardBtn.addEventListener("click", toggleDifficulty);

introScreen.addEventListener("submit", startGame);
nameInput.addEventListener("change", changeName);

grid.addEventListener("click", handleGrid);
playAgainBtn.addEventListener("click", () => window.location.reload());
showLeaderboardBtn.addEventListener("click", () => showLeaderboard(false));

rulesBtn.addEventListener("click", openRules);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("closable")) {
    closeModal(e.target);
  }
});
