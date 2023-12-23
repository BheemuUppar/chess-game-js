function getPawnMoves(isWhite, id) {
  let x = Number(id);
  let arr = [];
  let inner;
  let diagonalIds  = isWhite?[x + 11,x - 9 ]:[x + 9, x - 11];
  if (isWhite) {
    for (let i = 0; i < 2; i++) {
      let temp = ++id;
      if (
        checkIfPwanExistWithGivenId(temp) &&
        document.getElementById(temp).innerHTML == ""
      ) {
        arr.push(temp);
      } else {
        break;
      }
    }
    inner = checkIfPwanExistWithGivenId(diagonalIds[0])?document.getElementById(diagonalIds[0]).innerHTML:"";
    if (checkIfPwanExistWithGivenId(diagonalIds[0]) &&
      document.getElementById(diagonalIds[0]).innerHTML != "" &&
      inner.includes("Black")
    ) {
      arr.push(diagonalIds[0]);
    }
    inner = checkIfPwanExistWithGivenId(diagonalIds[1])?document.getElementById(diagonalIds[1]).innerHTML:"";
    if (
        checkIfPwanExistWithGivenId(diagonalIds[1]) &&
      document.getElementById(diagonalIds[1]).innerHTML != "" &&
      inner.includes("Black")
    ) {
      arr.push(diagonalIds[1]);
    }
  } else {
    // for black pawn
    for (let i = 0; i < 2; i++) {
      let temp = --id;

      if (
        temp >= 11 &&
        temp <= 88 &&
        checkIfPwanExistWithGivenId(temp) &&
        document.getElementById(temp).innerHTML == ""
      ) {
        arr.push(temp);
      } else {
        break;
      }
    }
    inner = checkIfPwanExistWithGivenId(diagonalIds[0])?document.getElementById(diagonalIds[0]).innerHTML:"";
    if (
        checkIfPwanExistWithGivenId(diagonalIds[0])&&
      document.getElementById(diagonalIds[0]).innerHTML != "" &&
      inner.includes("White")
    ) {
      arr.push(diagonalIds[0]);
    }
    inner = checkIfPwanExistWithGivenId(diagonalIds[1])?document.getElementById(diagonalIds[1]).innerHTML:"";
    if (
        checkIfPwanExistWithGivenId(diagonalIds[1]) &&
      document.getElementById(diagonalIds[1]).innerHTML != "" &&
      inner.includes("White")
    ) {
      arr.push(diagonalIds[1]);
    }
  }
  return arr;
}

function getKnightMoves(isWhite, id) {
  let arr = [];
  let n = Number(id); // 45 + 12 , 45-12,  45+8 , 45-8,  45+21 , 45-21, 45-19, 45+19;
  let possibles = [
    n + 12,
    n - 12,
    n + 8,
    n - 8,
    n + 21,
    n - 21,
    n + 19,
    n - 19,
  ];
  for (let number of possibles) {
    if (
      checkIfPwanExistWithGivenId(number) &&
      document.getElementById(number).innerHTML == ""
    ) {
      arr.push(number);
    }
    let  inner = checkIfPwanExistWithGivenId(number)?document.getElementById(number).innerHTML:"";
      if ((inner.includes("Black") && isWhite) || (inner.includes("White") && !isWhite)) {
        arr.push(number);
      }
  }
  return arr;
}

function getRookMoves(isWhite, id) {
  let n = Number(id);
  let arr = [];
  let forwardMoves = getRookForwardMoves(isWhite , n);
  let backwardMoves = getRookBackwardMoves(isWhite , n);
  let leftMoves = getRookLeftMoves(isWhite , n);
  let rightMoves = getRookRightMoves(isWhite , n);
  arr = [...forwardMoves , ...backwardMoves, ...leftMoves, ...rightMoves];
  return arr;
}

function getRookForwardMoves(isWhite , id){
    let n = id;
    let arr =[]
    for (let i = 1; i < 10; i++) {
       isWhite?++n:--n;
        if (
          checkIfPwanExistWithGivenId(n) &&
          document.getElementById(n).innerHTML == ""
        ) {
          arr.push(n);
        }
  
        // if oppoenent pawn is there means
        if (
          checkIfPwanExistWithGivenId(n) &&
          document.getElementById(n).innerHTML != "" &&
          arr.indexOf(n) == -1
        ) {
          let inner = document.getElementById(n).innerHTML;
  
          if ((inner.includes("White") && !isWhite) || inner.includes("Black") && isWhite ) {
            arr.push(n);
          }
        }
        if (
          !checkIfPwanExistWithGivenId(n) ||
          document.getElementById(n).innerHTML != ""
        ) {
          break;
        }
      }
      return arr;
}
function getRookBackwardMoves(isWhite , id){
    let arr =[];
   let n = id
    for (let i = 1; i < 10; i++) {
        isWhite? --n:++n;
        if (!checkIfPwanExistWithGivenId(n)) {
          break;
        }
        if (document.getElementById(n) != "") {
          let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
          if ((pawn.includes("Black") && isWhite && arr.indexOf(n) == -1 )|| (pawn.includes("White")&& !isWhite && arr.indexOf(n) == -1 )) {
            arr.push(n);
            break;
          }
        }
        if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
          arr.push(n);
        }
      }
      return arr;
}
function getRookLeftMoves (isWhite , id){
let arr = [];
let n =id
for (let i = 1; i < 10; i++) {
    n = isWhite?n-10:n + 10;
    if ( !checkIfPwanExistWithGivenId(n)) {
      break;
    }
    // checking for opponent pawn
    if ( checkIfPwanExistWithGivenId(n)) {
      let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
      if ((pawn.includes("White") && !isWhite && arr.indexOf(n) == -1) || pawn.includes("Black") && isWhite && arr.indexOf(n) == -1 ) {
        arr.push(n);
        break;
      }
    }
    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
    // breaking
    if ( checkIfPwanExistWithGivenId(n) && document.getElementById(n).innerHTML != "") {
      // if (document.getElementById(n).innerHTML != "") {
        break;
      // }
    }
  }
  return arr;
}
function getRookRightMoves(isWhite , id){
    let n = id;
    let arr = [];
    for (let i = 1; i < 10; i++) {
        n = isWhite? n + 10:n-10;
        if ( !checkIfPwanExistWithGivenId(n)) {
          break;
        }
        // checking for opponent pawn
        if (document.getElementById(n) != "") {
          let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
          if ((pawn.includes("Black") && isWhite && arr.indexOf(n) == -1) || (pawn.includes("White") && !isWhite && arr.indexOf(n) == -1)) {
            arr.push(n);
            break;
          }
        }
        if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
          arr.push(n);
        }
        if ( checkIfPwanExistWithGivenId(n)) {
          if (document.getElementById(n).innerHTML != "") {
            break;
          }
        }
      }
      return arr;
}

// Bishop
function getBishopMoves(isWhite, id) {
  let n = Number(id);
  let arr = [];
  //  for Right forword moves
  for (let i = 1; i < 10; i++) {
    ++n;
    n = n + 10;
    if (
        checkIfPwanExistWithGivenId(n) &&
      document.getElementById(n).innerHTML == ""
    ) {
      arr.push(n);
    }
    // if oppoenent pawn is there means
    if (
        checkIfPwanExistWithGivenId(n) &&
      document.getElementById(n).innerHTML != "" &&
      arr.indexOf(n) == -1
    ) {
      let inner = document.getElementById(n).innerHTML;
      if ((inner.includes("Black") && isWhite) || (inner.includes("White") && !isWhite)) {
        arr.push(n);
      }
    }
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("Black") && isWhite) || (findPawnName(str).includes("White") && !isWhite)) {
      arr.push(n);
    }
  }

  n = Number(id);
  //  for left forword moves
  for (let i = 1; i < 10; i++) {
    n = n - 10;
    ++n;
    if ( pawnNotContains(n)) {
      break;
    }
    if (
      document.getElementById(n) != null &&
      document.getElementById(n).innerHTML == "" &&
      arr.indexOf(n) == -1
    ) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("Black") && isWhite) || (findPawnName(str).includes("White") && !isWhite) ) {
      arr.push(n);
    }
  }
  n = Number(id);
  //  for  left backword moves
  for (let i = 1; i < 10; i++) {
    --n;
    n = n - 10;
    if ( pawnNotContains(n)) {
      break;
    }
    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("Black") && isWhite) ||( findPawnName(str).includes("White") && !isWhite)) {
      arr.push(n);
    }
  }
  n = Number(id);
  //  for right bottom moves
  for (let i = 1; i < 10; i++) {
    --n;
    n = n + 10;
    if ( pawnNotContains(n)) {
      break;
    }
    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("Black") && isWhite) || (findPawnName(str).includes("White") && !isWhite)) {
      arr.push(n);
    }
  }
 
  return arr;
}

// getting queen Moves
function getQueenMoves(isWhite, id) {
  let n = Number(id);
  let arr = [];
  //  for forword moves
  for (let i = 1; i < 10; i++) {
    isWhite?++n:--n;
    if (
      document.getElementById(n) &&
      document.getElementById(n).innerHTML == ""
    ) {
      arr.push(n);
    }
    // if oppoenent pawn is there means
    if (
        checkIfPwanExistWithGivenId(n) &&
      document.getElementById(n).innerHTML != "" &&
      arr.indexOf(n) == -1
    ) {
      let inner = document.getElementById(n).innerHTML;

      if (inner.includes("Black") && isWhite) {
        arr.push(n);
      }
      if (inner.includes("White") && !isWhite) {
        arr.push(n);
      }
    }
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
  }
  
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite)) {
      arr.push(n);
    }
  }
 
  n = Number(id);
  //  for backward moves
  for (let i = 1; i < 10; i++) {
    isWhite?--n:++n;
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite)) {
      arr.push(n);
    }
  }
  
  n = Number(id);
  //  for left side moves
  for (let i = 1; i < 10; i++) {
    isWhite? n = n - 10: n = n + 10;
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite)) {
      arr.push(n);
    }
  }
  
  n = Number(id);
  //  for right side moves
  for (let i = 1; i < 10; i++) {
    if (isWhite) {
      n = n + 10;
    } else {
      n = n - 10;
    }
    // n = n + 10;
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite)) {
      arr.push(n);
    }
  }

  // for diagonal
  n = Number(id);
  //  for Right forword moves
  for (let i = 1; i < 10; i++) {
    ++n;
    n = n + 10;
    if (
        checkIfPwanExistWithGivenId(n) &&
      document.getElementById(n).innerHTML == ""
    ) {
      arr.push(n);
    }
    // if oppoenent pawn is there means
    if (
        checkIfPwanExistWithGivenId(n) &&
      document.getElementById(n).innerHTML != "" &&
      arr.indexOf(n) == -1
    ) {
      let inner = document.getElementById(n).innerHTML;

      if ((inner.includes("Black") && isWhite) || (inner.includes("White") && !isWhite)) {
        arr.push(n);
      }
     
    }
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite)) {
      arr.push(n);
    }
  }

  n = Number(id);
  //  for left forword moves
  for (let i = 1; i < 10; i++) {
    n = n - 10;
    ++n;
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
    if (
        checkIfPwanExistWithGivenId(n) &&
      document.getElementById(n).innerHTML == "" &&
      arr.indexOf(n) == -1
    ) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite) ) {
      arr.push(n);
    }
  }

  n = Number(id);
  //  for  left backword moves
  for (let i = 1; i < 10; i++) {
    --n;
    n = n - 10;
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }

    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite)) {
      arr.push(n);
    }
  }
  
  n = Number(id);
  //  for right bottom moves
  for (let i = 1; i < 10; i++) {
    --n;
    n = n + 10;
    if (
      document.getElementById(n) == null ||
      document.getElementById(n).innerHTML != ""
    ) {
      break;
    }
    if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
      arr.push(n);
    }
  }
  if (checkIfPwanExistWithGivenId(n)) {
    const str = document.getElementById(n).innerHTML + "";
    if ((findPawnName(str).includes("White") && !isWhite) || (findPawnName(str).includes("Black") && isWhite)) {
      arr.push(n);
    }
  }
  return arr;
}

function getKingMoves(isWhite, id) {
  let n = Number(id);
  let arr = [];
  let isOppsitePawn = true;
  
  // we can use loops here to avoid if-else repitation
  let posibleMoves = [n + 1, n - 1, n+10 , n - 10, n + 11, n - 11 ,n-9 , n+9] ;
  posibleMoves.forEach(id=>{
    if(oppositePawnMoves.indexOf(id) == -1){
      let isNull = document.getElementById(id) == null;
    if ((!isNull && isOppsitePawn) ||(!isNull && document.getElementById(id) == "")) {
      let temp = findPawnName(document.getElementById(id).innerHTML) + "";
      if (isWhite && temp.includes("White")) {
      } else if (!isWhite && temp.includes("Black")) {
      } else {
        arr.push(id);
      }
    }
    }
  })
  return arr;
}

function checkIfPwanExistWithGivenId(id){
    return document.getElementById(id) != null && document.getElementById(id) != undefined
}

function pawnNotContains(n){
    return document.getElementById(n) == null || document.getElementById(n).innerHTML != ""
}