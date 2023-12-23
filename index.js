let squares = document.querySelectorAll(".square");
let isPawnSelected = false;
let moves = [];
let currentId;
let currentTurn = "white";
let clickAudio = new Audio("../audios/click.mp3");
let moveAudio = new Audio("../audios/move.mp3");
let killAudio = new Audio("../audios/kill.mp3");
let checkmateAudio = new Audio("../audios/checkmate.mp3");
let gameOverAudio = new Audio("../audios/gameOver.mp3");
let gameStart = new Audio("../audios/game-start.mp3");

let selected = '';
gameStart.play();

let selectedArray =[];

squares.forEach((ele) => {
  ele.addEventListener("click", () => {
    // removing  hints for previosly clicked pawns
    removeHint(ele.getAttribute("id"));
    let isWhite;
    let pawnName;
    if (!isPawnSelected) {
        if (ele.innerHTML != "") {
            currentId = ele.getAttribute("id");
            selected = currentId;
           
        isWhite = ele.innerHTML.includes("White");
        pawnName = findPawnName(ele.innerHTML);
        if (isWhite && currentTurn === "white") {
          isPawnSelected = true;
        //   selectedArray.push(selected);
        //   selectPawn()
         
          clickAudio.play();
          if (pawnName === "WhitePawn") {
            moves = getPawnMoves(true, currentId);
            addHint(moves);
          }
          if (pawnName === "WhiteKnight") {
            moves = getKnightMoves(true, currentId);
            addHint(moves);
          }
          if (pawnName === "WhiteRook") {
            moves = getRookMoves(true, currentId);
            addHint(moves);
          }
          if (pawnName === "WhiteBishop") {
            moves = getBishopMoves(true, currentId);
            addHint(moves);
          }
          if (pawnName === "WhiteQueen") {
            moves = getQueenMoves(true, currentId);
            addHint(moves);
          }
          if (pawnName === "WhiteKing") {
            moves = getKingMoves(true, currentId);
            addHint(moves);
          }
        }
        // code for black pawns
        if (!isWhite && currentTurn === "black") {
          isPawnSelected = true;
        //   selectPawn();
          clickAudio.play();
          if (pawnName === "BlackPawn") {
            moves = getPawnMoves(false, currentId);
            addHint(moves);
          }
          if (pawnName === "BlackKnight") {
            moves = getKnightMoves(false, currentId);
            addHint(moves);
          }
          if (pawnName === "BlackRook") {
            moves = getRookMoves(false, currentId);
            addHint(moves);
          }
          if (pawnName === "BlackBishop") {
            moves = getBishopMoves(false, currentId);
            addHint(moves);
          }
          if (pawnName === "BlackQueen") {
            moves = getQueenMoves(false, currentId);
            addHint(moves);
          }
          if (pawnName === "BlackKing") {
            moves = getKingMoves(false, currentId);
            addHint(moves);
          }
        }
      } else {
        // logic if no pawn is there on clicked square
        unselect();
      }
    } else {
      isPawnSelected = false;
      movePawn(currentId, ele.getAttribute("id"));
    }
  });
});

// function to find Pawn Name on clicked square
function findPawnName(str) {
  if (str.includes("WhitePawn")) {
    return "WhitePawn";
  } else if (str.includes("WhiteRook")) {
    return "WhiteRook";
  } else if (str.includes("WhiteBishop")) {
    return "WhiteBishop";
  } else if (str.includes("WhiteKnight")) {
    return "WhiteKnight";
  } else if (str.includes("WhiteQueen")) {
    return "WhiteQueen";
  } else if (str.includes("WhiteKing")) {
    return "WhiteKing";
  } else if (str.includes("BlackPawn")) {
    return "BlackPawn";
  } else if (str.includes("BlackRook")) {
    return "BlackRook";
  } else if (str.includes("BlackBishop")) {
    return "BlackBishop";
  } else if (str.includes("BlackKnight")) {
    return "BlackKnight";
  } else if (str.includes("BlackQueen")) {
    return "BlackQueen";
  } else if (str.includes("BlackKing")) {
    return "BlackKing";
  } else {
    return null;
  }
}

let highlights;

function addHint(ids) {
  // adding Hint
  ids.forEach((id) => {
    document.getElementById(id + "").classList.add("hint");
  });
}

function removeHint(clicked) {
  // highlights = [];
  //    removing hits
  moves.forEach((id) => {
    if (currentId != clicked) {
      document.getElementById(id + "").classList.remove("hint");
    }
  });
}

function movePawn(from, to) {
  for (const ii of moves) {
    if (to == ii && from != to) {
      let temp = document.getElementById(from).innerHTML;
      if (document.getElementById(to).innerHTML != "") {
        killAudio.play();
      }
      document.getElementById(from).innerHTML = "";
      document.getElementById(to).innerHTML = temp;
      moveAudio.play();
      if (currentTurn === "white") {
        currentTurn = "black";
        onCheck(true);
        checkforWinner(true);
        unselect();
        // getOppositeAlivePawns(currentTurn=='white'?false:true)
       
      } else if (currentTurn === "black") {
        currentTurn = "white";
        onCheck(false);
        checkforWinner(false);
        unselect();
      }
      getOppositeAlivePawns(currentTurn=='white'?true:false)
      changeTurn();
      break;
    }
  }
}

function unselect(){
    selectedArray.forEach(id=>{
        if( document.getElementById(id)){
           document.getElementById(id).classList.remove('selected');
       }
   })
}
function selectPawn(){
    selectedArray.forEach(id=>{
      if(id == selected &&  document.getElementById(selected)){
          document.getElementById(selected).classList.add('selected');
      }
    })
}

function changeTurn() {
  const turn = document.querySelector("#turn");
  // turn.innerHTML = currentTurn;
  // turn.getAttribute('src') = "../images/pawns/white/BlackKing.png";
  if (currentTurn == "black") {
    turn.setAttribute("src", "./images/pawns/black/BlackKing.png");
  } else {
    turn.setAttribute("src", "./images/pawns/white/WhiteKing.png");
  }
}

// let nextMoves = [];
let isCheck = false;

function onCheck(isWhite) {
  let temp = [];
  let opponentKingPlace = null;

  if (!isWhite) {
    const childElement = document.querySelectorAll(".black");
    childElement.forEach((ele) => {
      let id = ele.parentElement.getAttribute("id");
      let name = findPawnName(document.getElementById(id).innerHTML) + "";
      temp = [...new Set(temp.concat(getMovesByPawnName(name, id)))];
    });
    //  finding oopposite King place
    const childElements = document.querySelectorAll(".white");
    childElements.forEach((ele) => {
      let id = ele.parentElement.getAttribute("id");
      let name = findPawnName(document.getElementById(id).innerHTML) + "";
      if (name === "WhiteKing") {
        opponentKingPlace = Number(id);
      }

      if (temp.indexOf(opponentKingPlace) != -1) {
        isCheck = true;
      }
    });
  } else {
    const childElement = document.querySelectorAll(".white");
    childElement.forEach((ele) => {
      let id = ele.parentElement.getAttribute("id");
      let name = findPawnName(document.getElementById(id).innerHTML) + "";
      temp = [...new Set(temp.concat(getMovesByPawnName(name, id)))];
    });
    //  finding oopposite King place
    const childElements = document.querySelectorAll(".black");
    childElements.forEach((ele) => {
      let id = ele.parentElement.getAttribute("id");
      let name = findPawnName(document.getElementById(id).innerHTML) + "";
      if (name === "BlackKing") {
        opponentKingPlace = Number(id);
      }
      if (temp.indexOf(opponentKingPlace) != -1) {
        isCheck = true;
      }
    });
  }
  // }
  if (isCheck) {
    checkmateAudio.play();
    isCheck = false;
  }
}

function getMovesByPawnName(name, id ) {
  let moves = [];
  switch (name) {
    case "BlackPawn":
      moves = getPawnMoves(false, id);
      break;
    case "BlackRook":
      moves = getRookMoves(false, id);
      break;
    case "BlackKnight":
      moves = getKnightMoves(false, id);
      break;
    case "BlackBishop":
      moves = getBishopMoves(false, id);
      break;
    case "BlackQueen":
      moves = getQueenMoves(false, id);
      break;
    case "BlackKing":
      moves = getKingMoves(false, id);
      break;
    //   for white
    case "WhitePawn":
      moves = getPawnMoves(true, id);
      break;
    case "WhiteRook":
      moves = getRookMoves(true, id);
      break;
    case "WhiteKnight":
      moves = getKnightMoves(true, id);
      break;
    case "WhiteBishop":
      moves = getBishopMoves(true, id);
      break;
    case "WhiteQueen":
      moves = getQueenMoves(true, id);
      break;
    case "WhiteKing":
      moves = getKingMoves(true, id);
      break;
    default:
  }

  return moves;
}

function checkforWinner(isWhite) {
  let temp = [];
  if (isWhite) {
    const childElements = document.querySelectorAll(".black");
    childElements.forEach((ele) => {
      let id = ele.parentElement.getAttribute("id");
      let name = findPawnName(document.getElementById(id).innerHTML) + "";
      temp.push(name);
    });
    if (temp.indexOf("BlackKing") === -1) {
      gameOverAudio.play();
      setTimeout(() => {
        alert("White win");
        resetGame();
      }, 3000);
    }
  } else {
    const childElements = document.querySelectorAll(".white");
    childElements.forEach((ele) => {
      let id = ele.parentElement.getAttribute("id");
      let name = findPawnName(document.getElementById(id).innerHTML) + "";
      temp.push(name);
    });
    if (temp.indexOf("WhiteKing") === -1) {
      gameOverAudio.play();
      // alert("Black win");
      // resetGame();
      setTimeout(() => {
        alert("Black win");
        resetGame();
      }, 3000);
    }
  }
}

function resetGame() {
  window.location.reload();
}

let oppositePawnMoves = [];
function getOppositeAlivePawns(isWhite){
  oppositePawnMoves =[]
    squares.forEach(square=>{
      if(square?.children[0]?.getAttribute('src')){
        let id = Number(square.getAttribute('id'));
        const src = square?.children[0]?.getAttribute('src');
        let currentPawn = findPawnName(src);
        if(!isWhite && currentPawn.includes('White') ){
          oppositePawnMoves.push( ...getMovesByPawnName(currentPawn,id));
        }
        else if(isWhite && currentPawn.includes('Black') ){
            // console.log(currentPawn);
            oppositePawnMoves.push(...getMovesByPawnName(currentPawn,id));
        }
      }
    });
 
      let temp = new Set(oppositePawnMoves)
      // console.log(Array.from(temp));
      return Array.from(temp)
}




