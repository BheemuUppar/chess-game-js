function getPawnMoves(isWhite, id) {
  let x = Number(id);
  let arr = [];
  let inner;
  if (isWhite) {
    for (let i = 0; i < 2; i++) {
      let temp = ++id;
      if (
        document.getElementById(temp) != null &&
        document.getElementById(temp).innerHTML == ""
      ) {
        arr.push(temp);
      } else {
        break;
      }
    }
    // getting pawn moves in diagonal direction if there is pawn
    if (document.getElementById(x + 11) != null)
      inner = document.getElementById(x + 11).innerHTML;
    if (
      document.getElementById(x + 11) != null &&
      document.getElementById(x + 11).innerHTML != "" &&
      inner.includes("Black")
    ) {
      arr.push(x + 11);
    }
    if (document.getElementById(x - 9) != null)
      inner = document.getElementById(x - 9).innerHTML;
    if (
      document.getElementById(x - 9) != null &&
      document.getElementById(x - 9).innerHTML != "" &&
      inner.includes("Black")
    ) {
      arr.push(x - 9);
    }
  } else {
    // for black pawn
    for (let i = 0; i < 2; i++) {
      let temp = --id;

      if (
        temp >= 11 &&
        temp <= 88 &&
        document.getElementById(temp) != null &&
        document.getElementById(temp).innerHTML == ""
      ) {
        arr.push(temp);
      } else {
        break;
      }
    }
    // getting pawn moves in diagonal direction if there is pawn
    if (document.getElementById(x + 9) != null)
      inner = document.getElementById(x + 9).innerHTML;
    if (
      document.getElementById(x + 9) != null &&
      document.getElementById(x + 9).innerHTML != "" &&
      inner.includes("White")
    ) {
      arr.push(x + 9);
    }
    if (document.getElementById(x - 11) != null)
      inner = document.getElementById(x - 11).innerHTML;
    if (
      document.getElementById(x - 11) != null &&
      document.getElementById(x - 11).innerHTML != "" &&
      inner.includes("White")
    ) {
      arr.push(x - 11);
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
      document.getElementById(number) != null &&
      document.getElementById(number).innerHTML == ""
    ) {
      arr.push(number);
    }
    if (
      document.getElementById(number) != null &&
      document.getElementById(number).innerHTML != ""
    ) {
      let inner = document.getElementById(number).innerHTML;

      if (inner.includes("Black") && isWhite) {
        arr.push(number);
      }
      if (inner.includes("White") && !isWhite) {
        arr.push(number);
      }
    }
  }

  return arr;
}

function getRookMoves(isWhite, id) {
  let n = Number(id);
  let arr = [];
  if (isWhite) {
    //  for forword moves
    for (let i = 1; i < 10; i++) {
      ++n;
      if (
        document.getElementById(n) &&
        document.getElementById(n).innerHTML == ""
      ) {
        arr.push(n);
      }

      // if oppoenent pawn is there means
      if (
        document.getElementById(n) != null &&
        document.getElementById(n).innerHTML != "" &&
        arr.indexOf(n) == -1
      ) {
        let inner = document.getElementById(n).innerHTML;

        if (inner.includes("Black") && isWhite) {
          arr.push(n);
        }
        // if (inner.includes('White') && !isWhite) {
        //     arr.push(n);
        // }
      }
      if (
        document.getElementById(n) == null ||
        document.getElementById(n).innerHTML != ""
      ) {
        break;
      }
    }
    n = Number(id);
    //  for backward moves
    for (let i = 1; i < 10; i++) {
      --n;
      if (document.getElementById(n) == null) {
        break;
      }
      if (document.getElementById(n) != "") {
        let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
        if (pawn.includes("Black") && arr.indexOf(n) == -1) {
          arr.push(n);
          break;
        }
      }
      if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
        arr.push(n);
      }
    }
    n = Number(id);
    //  for left side moves
    for (let i = 1; i < 10; i++) {
      debugger;
      n = n - 10;
      // debugger
      if (document.getElementById(n) == null) {
        break;
      }
      if (document.getElementById(n) != "") {
        let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
        if (pawn.includes("Black") && arr.indexOf(n) == -1) {
          arr.push(n);
          break;
        }
      }

      if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
        arr.push(n);
      }
      if (document.getElementById(n)) {
        if (document.getElementById(n).innerHTML != "") {
          break;
        }
      }
    }
    n = Number(id);
    //  for right side moves
    for (let i = 1; i < 10; i++) {
      n = n + 10;
      if (document.getElementById(n) == null) {
        break;
      }
      // checking for opponent pawn
      if (document.getElementById(n) != "") {
        let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
        if (pawn.includes("Black") && arr.indexOf(n) == -1) {
          arr.push(n);
          break;
        }
      }
      if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
        arr.push(n);
      }
      if (document.getElementById(n)) {
        if (document.getElementById(n).innerHTML != "") {
          break;
        }
      }
    }
  } else {
    //  for forword moves
    for (let i = 1; i < 10; i++) {
      --n;
      if (
        document.getElementById(n) &&
        document.getElementById(n).innerHTML == ""
      ) {
        arr.push(n);
      }

      // if oppoenent pawn is there means
      if (
        document.getElementById(n) != null &&
        document.getElementById(n).innerHTML != "" &&
        arr.indexOf(n) == -1
      ) {
        let inner = document.getElementById(n).innerHTML;

        if (inner.includes("White") && !isWhite) {
          arr.push(n);
        }
        // if (inner.includes('White') && !isWhite) {
        //     arr.push(n);
        // }
      }
      if (
        document.getElementById(n) == null ||
        document.getElementById(n).innerHTML != ""
      ) {
        break;
      }
    }
    n = Number(id);
    //  for backward moves
    for (let i = 1; i < 10; i++) {
      ++n;
      if (document.getElementById(n) == null) {
        break;
      }
      //   checking for opponent pawn
      if (document.getElementById(n) != "") {
        let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
        if (pawn.includes("White") && arr.indexOf(n) == -1) {
          arr.push(n);
          break;
        }
      }

      if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
        arr.push(n);
      }
    }
    n = Number(id);
    //  for left side moves
    for (let i = 1; i < 10; i++) {
      n = n + 10;
      if (document.getElementById(n) == null) {
        break;
      }
      // checking for opponent pawn
      if (document.getElementById(n) != "") {
        let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
        if (pawn.includes("White") && arr.indexOf(n) == -1) {
          arr.push(n);
          break;
        }
      }
      if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
        arr.push(n);
      }
      // breaking
      if (document.getElementById(n)) {
        if (document.getElementById(n).innerHTML != "") {
          break;
        }
      }
    }
    n = Number(id);
    //  for right side moves
    for (let i = 1; i < 10; i++) {
      n = n - 10;
      if (document.getElementById(n) == null) {
        break;
      }
      // checking for opponent pawn
      if (document.getElementById(n) != "") {
        let pawn = findPawnName(document.getElementById(n).innerHTML) + "";
        if (pawn.includes("White") && arr.indexOf(n) == -1) {
          arr.push(n);
          break;
        }
      }
      if (document.getElementById(n).innerHTML == "" && arr.indexOf(n) == -1) {
        arr.push(n);
      }
      if (document.getElementById(n)) {
        if (document.getElementById(n).innerHTML != "") {
          break;
        }
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
      document.getElementById(n) != null &&
      document.getElementById(n).innerHTML == ""
    ) {
      arr.push(n);
    }
    // if oppoenent pawn is there means
    if (
      document.getElementById(n) != null &&
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
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
      document.getElementById(n) != null &&
      document.getElementById(n).innerHTML == "" &&
      arr.indexOf(n) == -1
    ) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
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
    if (isWhite) {
      ++n;
    } else {
      --n;
    }
    if (
      document.getElementById(n) &&
      document.getElementById(n).innerHTML == ""
    ) {
      arr.push(n);
    }
    // if oppoenent pawn is there means
    if (
      document.getElementById(n) != null &&
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
      arr.push(n);
    }
  }
  n = Number(id);
  //  for backward moves
  for (let i = 1; i < 10; i++) {
    if (isWhite) {
      --n;
    } else {
      ++n;
    }
    // --n;
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
      arr.push(n);
    }
  }
  n = Number(id);
  //  for left side moves
  for (let i = 1; i < 10; i++) {
    // n = n - 10;
    if (isWhite) {
      n = n - 10;
    } else {
      n = n + 10;
    }
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
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
      document.getElementById(n) != null &&
      document.getElementById(n).innerHTML == ""
    ) {
      arr.push(n);
    }
    // if oppoenent pawn is there means
    if (
      document.getElementById(n) != null &&
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
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
      document.getElementById(n) != null &&
      document.getElementById(n).innerHTML == "" &&
      arr.indexOf(n) == -1
    ) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
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
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("White") && !isWhite) {
      arr.push(n);
    }
  }
  if (document.getElementById(n) !== null) {
    const str = document.getElementById(n).innerHTML + "";
    if (findPawnName(str).includes("Black") && isWhite) {
      arr.push(n);
    }
  }

  return arr;
}

function getKingMoves(isWhite, id) {
  let n = Number(id);
  let arr = [];
  let isOppsitePawn = true;
  let isNull = document.getElementById(n + 1) == null;

  if (
    (!isNull && isOppsitePawn) ||
    (!isNull && document.getElementById(n + 1) == "")
  ) {
    let temp = findPawnName(document.getElementById(n + 1).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n + 1);
    }
  }
  isNull = document.getElementById(n - 1) == null;
  if (
    (document.getElementById(n - 1) != null && isOppsitePawn) ||
    (document.getElementById(n - 1) != null &&
      document.getElementById(n - 1) == "")
  ) {
    // arr.push(n - 1);
    let temp = findPawnName(document.getElementById(n - 1).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n - 1);
    }
  }
  isNull = document.getElementById(n + 10) == null;
  if (
    (document.getElementById(n + 10) != null && isOppsitePawn) ||
    (document.getElementById(n + 10) != null &&
      document.getElementById(n + 10) == "")
  ) {
    let temp = findPawnName(document.getElementById(n + 10).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n + 10);
    }
  }
  isNull = document.getElementById(n - 10) == null;
  if (
    (document.getElementById(n - 10) != null && isOppsitePawn) ||
    (document.getElementById(n - 10) != null &&
      document.getElementById(n - 10) == "")
  ) {
    let temp = findPawnName(document.getElementById(n - 10).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n - 10);
    }
  }
  isNull = document.getElementById(n + 11) == null;
  if (
    (document.getElementById(n + 11) != null && isOppsitePawn) ||
    (document.getElementById(n + 11) != null &&
      document.getElementById(n + 11) == "")
  ) {
    // arr.push(n + 11);
    let temp = findPawnName(document.getElementById(n + 11).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n + 11);
    }
  }
  isNull = document.getElementById(n - 11) == null;
  if (
    (document.getElementById(n - 11) != null && isOppsitePawn) ||
    (document.getElementById(n - 11) != null &&
      document.getElementById(n - 11) == "")
  ) {
    // arr.push(n - 11);
    let temp = findPawnName(document.getElementById(n - 11).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n - 11);
    }
  }
  isNull = document.getElementById(n + 9) == null;
  if (
    (document.getElementById(n + 9) != null && isOppsitePawn) ||
    (document.getElementById(n + 9) != null &&
      document.getElementById(n + 9) == "")
  ) {
    // arr.push(n + 9);
    let temp = findPawnName(document.getElementById(n + 9).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n + 9);
    }
  }
  isNull = document.getElementById(n - 9) == null;
  if (
    (document.getElementById(n - 9) != null && isOppsitePawn) ||
    (document.getElementById(n - 9) != null &&
      document.getElementById(n - 9) == "")
  ) {
    // arr.push(n - 9);
    let temp = findPawnName(document.getElementById(n - 9).innerHTML) + "";
    if (isWhite && temp.includes("White")) {
    } else if (!isWhite && temp.includes("Black")) {
    } else {
      arr.push(n - 9);
    }
  }
  return arr;
}
