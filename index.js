let squares = document.querySelectorAll('.square');
let isPawnSelected = false;
let moves = [];
let currentId;
let currentTurn = "white";

squares.forEach((ele) => {
    ele.addEventListener('click', () => {
        // removing  hints for previosly clicked pawns
        removeHint(ele.getAttribute('id'));


        let isWhite;
        let pawnName;

        if (!isPawnSelected) {
            if (ele.innerHTML != '') {
                currentId = ele.getAttribute('id');

                isWhite = ele.innerHTML.includes('White');
                pawnName = findPawnName(ele.innerHTML);
                console.log("Turn: ", currentTurn)
                if (isWhite && currentTurn === 'white') {
                    isPawnSelected = true;
                    if (pawnName === 'WhitePawn') {
                        // console.log("white pawn !");
                        moves = getPawnMoves(true, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'WhiteKnight') {
                        moves = getKnightMoves(true, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'WhiteRook') {
                        moves = getRookMoves(true, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'WhiteBishop') {
                        moves = getBishopMoves(true, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'WhiteQueen') {
                        moves = getQueenMoves(true, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'WhiteKing') {
                        moves = getKingMoves(true, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                }
                // code for black pawns
                if (!isWhite && currentTurn === 'black') {
                    isPawnSelected = true;
                    if (pawnName === 'BlackPawn') {
                        // console.log("black pawn !");
                        moves = getPawnMoves(false, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'BlackKnight') {
                        moves = getKnightMoves(false, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'BlackRook') {
                        moves = getRookMoves(false, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'BlackBishop') {
                        moves = getBishopMoves(false, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'BlackQueen') {
                        moves = getQueenMoves(false, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                    if (pawnName === 'BlackKing') {
                        moves = getKingMoves(false, currentId);
                        // console.log("pawn moves : ", moves);
                        addHint(moves);
                    }
                }
                console.log('from: ', currentId)

            } else {
                console.log('No pawn on clicked square')
            }
        } else {
            isPawnSelected = false;
            console.log('to : ', ele.getAttribute('id'))
            movePawn(currentId, ele.getAttribute('id'));
        }
    })
});

// function to find Pawn Name on clicked square
function findPawnName(str) {
    // console.log('Finding: ', str)
    if (str.includes('WhitePawn')) {
        return "WhitePawn";
    } else if (str.includes('WhiteRook')) {
        return "WhiteRook";
    } else if (str.includes('WhiteBishop')) {
        return "WhiteBishop";
    } else if (str.includes('WhiteKnight')) {
        return "WhiteKnight";
    } else if (str.includes('WhiteQueen')) {
        return "WhiteQueen";
    } else if (str.includes('WhiteKing')) {
        return "WhiteKing";
    } else if (str.includes('BlackPawn')) {
        return "BlackPawn";
    } else if (str.includes('BlackRook')) {
        return "BlackRook";
    } else if (str.includes('BlackBishop')) {
        return "BlackBishop";
    } else if (str.includes('BlackKnight')) {
        return "BlackKnight";
    } else if (str.includes('BlackQueen')) {
        return "BlackQueen";
    } else if (str.includes('BlackKing')) {
        return "BlackKing";
    } else {
        return null
    }

}


function getPawnMoves(isWhite, id) {
    let x = Number(id);
    let arr = [];
    let inner;
    if (isWhite) {
        for (let i = 0; i < 2; i++) {
            let temp = ++id;
            if ((document.getElementById(temp) != null && document.getElementById(temp).innerHTML == '')) {
                arr.push(temp);
            } else {
                break;
            }

        }
        // getting pawn moves in diagonal direction if there is pawn
        if (document.getElementById(x + 11) != null)
            inner = document.getElementById(x + 11).innerHTML;
        if (document.getElementById(x + 11) != null && document.getElementById(x + 11).innerHTML != '' && inner.includes('Black')) {
            arr.push(x + 11);
        }
        if (document.getElementById(x - 9) != null)
            inner = document.getElementById(x - 9).innerHTML;
        if (document.getElementById(x - 9) != null && document.getElementById(x - 9).innerHTML != '' && inner.includes('Black')) {
            arr.push(x - 9);
        }

    } else {
        // for black pawn
        for (let i = 0; i < 2; i++) {
            let temp = --id;

            if (temp >= 11 && temp <= 88 && document.getElementById(temp) != null && document.getElementById(temp).innerHTML == '') {
                arr.push(temp);
            } else {
                break;
            }
        }
        // getting pawn moves in diagonal direction if there is pawn
        if (document.getElementById(x + 9) != null)
            inner = document.getElementById(x + 9).innerHTML;
        if (document.getElementById(x + 9) != null && document.getElementById(x + 9).innerHTML != '' && inner.includes('White')) {
            arr.push(x + 9);
        }
        if (document.getElementById(x - 11) != null)
            inner = document.getElementById(x - 11).innerHTML;
        if (document.getElementById(x - 11) != null && document.getElementById(x - 11).innerHTML != '' && inner.includes('White')) {
            arr.push(x - 11);
        }
    }
    console.log("Moves: ", arr)
    return arr;

}

function getKnightMoves(isWhite, id) {
    let arr = [];
    let n = Number(id); // 45 + 12 , 45-12,  45+8 , 45-8,  45+21 , 45-21, 45-19, 45+19;
    let possibles = [n + 12, n - 12, n + 8, n - 8, n + 21, n - 21, n + 19, n - 19];
    for (let number of possibles) {
        if (document.getElementById((number)) != null && document.getElementById((number)).innerHTML == '') {
            arr.push(number);
        }
        if (document.getElementById((number)) != null && document.getElementById((number)).innerHTML != '') {
            let inner = document.getElementById((number)).innerHTML;

            if (inner.includes('Black') && isWhite) {
                arr.push(number);
            }
            if (inner.includes('White') && !isWhite) {
                arr.push(number);
            }
        }

    }

    console.log("MOVES: ", arr)
    return arr;
}

function getRookMoves(isWhite, id) {
    let n = Number(id);
    let arr = [];
    if (isWhite) {
        //  for forword moves
        for (let i = 1; i < 10; i++) {
            ++n;
            if (document.getElementById(n) && document.getElementById(n).innerHTML == '') {
                arr.push(n);
            }

            // if oppoenent pawn is there means 
            if (document.getElementById((n)) != null &&
                document.getElementById((n)).innerHTML != '' && arr.indexOf(n) == -1) {
                let inner = document.getElementById((n)).innerHTML;

                if (inner.includes('Black') && isWhite) {
                    arr.push(n);
                }
                // if (inner.includes('White') && !isWhite) {
                //     arr.push(n);
                // }
            }
            if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
                break;
            }
        }
        n = Number(id);
        //  for backward moves
        for (let i = 1; i < 10; i++) {

            // console.log('ROOK')
            --n;
            if ((document.getElementById(n) == null)) {
                break;
            }
            if ((document.getElementById(n) != '')) {
                let pawn = findPawnName(document.getElementById(n).innerHTML) + ''
                if (pawn.includes('Black') && arr.indexOf(n) == -1) {
                    arr.push(n)
                    break;
                }

            }
            if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
                arr.push(n);
            }


        }
        n = Number(id);
        //  for left side moves
        for (let i = 1; i < 10; i++) {
            debugger
            n = n - 10;
            // debugger
            if (document.getElementById(n) == null) {
                break;
            }
            if ((document.getElementById(n) != '')) {
                let pawn = findPawnName(document.getElementById(n).innerHTML) + ''
                if (pawn.includes('Black') && arr.indexOf(n) == -1) {
                    arr.push(n)
                    break;
                }

            }

            if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
                arr.push(n);
            }
            if (document.getElementById(n)) {
                if (document.getElementById(n).innerHTML != '') {

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
            if ((document.getElementById(n) != '')) {
                let pawn = findPawnName(document.getElementById(n).innerHTML) + ''
                if (pawn.includes('Black') && arr.indexOf(n) == -1) {
                    arr.push(n)
                    break;
                }

            }
            if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
                arr.push(n);
            }
            if (document.getElementById(n)) {
                if (document.getElementById(n).innerHTML != '') {
                    break;
                }
            }
        }
    } else {
        //  for forword moves
        for (let i = 1; i < 10; i++) {
            --n;
            if (document.getElementById(n) && document.getElementById(n).innerHTML == '') {
                arr.push(n);
            }

            // if oppoenent pawn is there means 
            if (document.getElementById((n)) != null &&
                document.getElementById((n)).innerHTML != '' && arr.indexOf(n) == -1) {
                let inner = document.getElementById((n)).innerHTML;

                if (inner.includes('White') && isWhite) {
                    arr.push(n);
                }
                // if (inner.includes('White') && !isWhite) {
                //     arr.push(n);
                // }
            }
            if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
                break;
            }
        }
        n = Number(id);
        //  for backward moves
        for (let i = 1; i < 10; i++) {

            // console.log('ROOK')
            ++n;
            if ((document.getElementById(n) == null)) {
                break;
            }
            //   checking for opponent pawn
            if ((document.getElementById(n) != '')) {
                let pawn = findPawnName(document.getElementById(n).innerHTML) + ''
                if (pawn.includes('White') && arr.indexOf(n) == -1) {
                    arr.push(n)
                    break;
                }

            }

            if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
                arr.push(n);
            }

        }
        n = Number(id);
        //  for left side moves
        for (let i = 1; i < 10; i++) {

            // console.log('ROOK')
            n = n + 10;
            if (document.getElementById(n) == null) {
                break;
            }
            // checking for opponent pawn
            if ((document.getElementById(n) != '')) {
                let pawn = findPawnName(document.getElementById(n).innerHTML) + ''
                if (pawn.includes('White') && arr.indexOf(n) == -1) {
                    arr.push(n)
                    break;
                }

            }
            if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
                arr.push(n);
            }
            // breaking
            if (document.getElementById(n)) {
                if (document.getElementById(n).innerHTML != '') {

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
            if ((document.getElementById(n) != '')) {
                let pawn = findPawnName(document.getElementById(n).innerHTML) + ''
                if (pawn.includes('White') && arr.indexOf(n) == -1) {
                    arr.push(n)
                    break;
                }

            }
            if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
                arr.push(n);
            }
            if (document.getElementById(n)) {
                if (document.getElementById(n).innerHTML != '') {
                    break;
                }
            }
        }
    }
    console.log(arr)
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
        if (document.getElementById(n) != null && document.getElementById(n).innerHTML == '') {
            arr.push(n);
        }
        // if oppoenent pawn is there means 
        if (document.getElementById((n)) != null && document.getElementById((n)).innerHTML != '' && arr.indexOf(n) == -1) {
            let inner = document.getElementById((n)).innerHTML;

            if (inner.includes('Black') && isWhite) {
                arr.push(n);
            }
            if (inner.includes('White') && !isWhite) {
                arr.push(n);
            }
        }
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {

            break;
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        console.log(findPawnName(str).includes('Black'), isWhite)
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)

        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }



    n = Number(id);
    //  for left forword moves
    for (let i = 1; i < 10; i++) {

        // console.log('ROOK')
        n = n - 10;
        ++n;
        if ((document.getElementById(n) == null || document.getElementById(n).innerHTML != '')) {
            break;
        }
        if (document.getElementById(n) != null && document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }

    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        console.log(findPawnName(str).includes('Black'), isWhite)
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)

        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    n = Number(id);
    //  for  left backword moves
    for (let i = 1; i < 10; i++) {

        // console.log('ROOK')
        --n;
        n = n - 10;
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }

        if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }


    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        console.log(findPawnName(str).includes('Black'), isWhite)
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)

        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    n = Number(id);
    //  for right bottom moves
    for (let i = 1; i < 10; i++) {

        // console.log('ROOK')
        --n;
        n = n + 10;
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }
        if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        console.log(findPawnName(str).includes('Black'), isWhite)
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)

        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    console.log(arr)
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
        if (document.getElementById(n).innerHTML == '') {
            arr.push(n);
        }
        // if oppoenent pawn is there means 
        if (document.getElementById((n)) != null && document.getElementById((n)).innerHTML != '' && arr.indexOf(n) == -1) {
            let inner = document.getElementById((n)).innerHTML;

            if (inner.includes('Black') && isWhite) {
                arr.push(n);
            }
            if (inner.includes('White') && !isWhite) {
                arr.push(n);
            }
        }
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
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
        if ((document.getElementById(n) == null || document.getElementById(n).innerHTML != '')) {
            break;
        }
        if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }

    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
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
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }

        if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }

    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
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
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }
        if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
        }
    }

    // for diagonal
    n = Number(id);
    //  for Right forword moves
    for (let i = 1; i < 10; i++) {
        ++n;
        n = n + 10;
        if (document.getElementById(n) != null && document.getElementById(n).innerHTML == '') {
            arr.push(n);
        }
        // if oppoenent pawn is there means 
        if (document.getElementById((n)) != null && document.getElementById((n)).innerHTML != '' && arr.indexOf(n) == -1) {
            let inner = document.getElementById((n)).innerHTML;

            if (inner.includes('Black') && isWhite) {
                arr.push(n);
            }
            if (inner.includes('White') && !isWhite) {
                arr.push(n);
            }
        }
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
        }
    }
    n = Number(id);
    //  for left forword moves
    for (let i = 1; i < 10; i++) {

        // console.log('ROOK')
        n = n - 10;
        ++n;
        if ((document.getElementById(n) == null || document.getElementById(n).innerHTML != '')) {
            break;
        }
        if (document.getElementById(n) != null && document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }

    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
        }
    }
    n = Number(id);
    //  for  left backword moves
    for (let i = 1; i < 10; i++) {

        // console.log('ROOK')
        --n;
        n = n - 10;
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }

        if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }


    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
        }
    }
    n = Number(id);
    //  for right bottom moves
    for (let i = 1; i < 10; i++) {

        // console.log('ROOK')
        --n;
        n = n + 10;
        if (document.getElementById(n) == null || document.getElementById(n).innerHTML != '') {
            break;
        }
        if (document.getElementById(n).innerHTML == '' && arr.indexOf(n) == -1) {
            arr.push(n);
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('White') && !isWhite) {
            arr.push(n)
        }
    }
    if (document.getElementById(n) !== null) {
        const str = document.getElementById(n).innerHTML + "";
        if (findPawnName(str).includes('Black') && isWhite) {
            arr.push(n)
        }
    }

    return arr;
}

function getKingMoves(isWhite, id) {
    let n = Number(id);
    let arr = [];
    let isOppsitePawn = true;
    let isNull = document.getElementById(n + 1) == null;

    if ((!isNull && isOppsitePawn) || (!isNull && document.getElementById(n + 1) == '')) {
        let temp = findPawnName(document.getElementById(n + 1).innerHTML) + ""
        console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n + 1);
        }
    }
    isNull = document.getElementById(n - 1) == null;
    if ((document.getElementById(n - 1) != null && isOppsitePawn) ||
        (document.getElementById(n - 1) != null && document.getElementById(n - 1) == '')) {
        // arr.push(n - 1);
        let temp = findPawnName(document.getElementById(n - 1).innerHTML) + ""
            // console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n - 1);
        }
    }
    isNull = document.getElementById(n + 10) == null;
    if ((document.getElementById(n + 10) != null && isOppsitePawn) ||
        (document.getElementById(n + 10) != null && document.getElementById(n + 10) == '')) {
        let temp = findPawnName(document.getElementById(n + 10).innerHTML) + ""
            // console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n + 10);
        }
    }
    isNull = document.getElementById(n - 10) == null;
    if ((document.getElementById(n - 10) != null && isOppsitePawn) ||
        (document.getElementById(n - 10) != null && document.getElementById(n - 10) == '')) {
        // arr.push(n - 10);
        let temp = findPawnName(document.getElementById(n - 10).innerHTML) + ""
            // console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n - 10);
        }
    }
    isNull = document.getElementById(n + 11) == null;
    if ((document.getElementById(n + 11) != null && isOppsitePawn) ||
        (document.getElementById(n + 11) != null && document.getElementById(n + 11) == '')) {
        // arr.push(n + 11);
        let temp = findPawnName(document.getElementById(n + 11).innerHTML) + ""
        console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n + 11);
        }
    }
    isNull = document.getElementById(n - 11) == null;
    if ((document.getElementById(n - 11) != null && isOppsitePawn) ||
        (document.getElementById(n - 11) != null && document.getElementById(n - 11) == '')) {
        // arr.push(n - 11);
        let temp = findPawnName(document.getElementById(n - 11).innerHTML) + ""
            // console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n - 11);
        }
    }
    isNull = document.getElementById(n + 9) == null;
    if ((document.getElementById(n + 9) != null && isOppsitePawn) ||
        (document.getElementById(n + 9) != null && document.getElementById(n + 9) == '')) {
        // arr.push(n + 9);
        let temp = findPawnName(document.getElementById(n + 9).innerHTML) + ""
            // console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n + 9);
        }
    }
    isNull = document.getElementById(n - 9) == null;
    if ((document.getElementById(n - 9) != null && isOppsitePawn) ||
        (document.getElementById(n - 9) != null && document.getElementById(n - 9) == '')) {
        // arr.push(n - 9);
        let temp = findPawnName(document.getElementById(n - 9).innerHTML) + ""
            // console.log("tejmp: ", temp);
        if (isWhite && temp.includes('White')) {

        } else if (!isWhite && temp.includes('Black')) {

        } else {

            arr.push(n - 9);
        }
    }
    console.log('moves', arr)
    return arr;
}


let highlights;

function addHint(ids) {

    // adding Hint
    ids.forEach((id) => {
        document.getElementById(id + '').classList.add('hint');
    });


}

function removeHint(clicked) {
    // highlights = [];

    //    removing hits
    moves.forEach((id) => {
        if (currentId != clicked) {
            document.getElementById(id + '').classList.remove('hint');
        }

    });

}

function movePawn(from, to) {

    for (const ii of moves) {
        if (to == ii && from != to) {
            let temp = document.getElementById(from).innerHTML;
            document.getElementById(from).innerHTML = '';
            document.getElementById(to).innerHTML = temp;

            if (currentTurn === 'white') {
                currentTurn = 'black';
                checkCheckmate(true);
                checkforWinner(true);
            } else if (currentTurn === 'black') {
                currentTurn = 'white';
                checkCheckmate(false);
                checkforWinner(false);

            }
            changeTurn();
            break;
        }
    }


}

function changeTurn() {
    const turn = document.querySelector('#turn');
    turn.innerHTML = currentTurn;
}

let nextMoves = [];
let isCheck = false;

function checkCheckmate(isWhite) {
    let temp = [];
    let opponentKingPlace = null;

    if (!isWhite) {

        // let blackPawns = document.querySelectorAll('.black');
        const childElement = document.querySelectorAll('.black');
        childElement.forEach((ele) => {
                // console.log(ele.parentElement.getAttribute('id'));
                let id = ele.parentElement.getAttribute('id');
                let name = findPawnName(document.getElementById(id).innerHTML) + '';
                console.log(name, getMovesByPawnName(name, id));
                temp = [...new Set(temp.concat(getMovesByPawnName(name, id)))];
                // console.log(name)
            })
            //  finding oopposite King place
        const childElements = document.querySelectorAll('.white');
        childElements.forEach((ele) => {
            // console.log(ele.parentElement.getAttribute('id'));
            let id = ele.parentElement.getAttribute('id');
            let name = findPawnName(document.getElementById(id).innerHTML) + '';
            // console.log(name, getMovesByPawnName(name, id));
            if (name === 'WhiteKing') {
                opponentKingPlace = Number(id);
            }
            console.log("In white block: ", opponentKingPlace)
            console.log("In white block: ", temp)

            if (temp.indexOf(opponentKingPlace) != -1) {
                isCheck = true;

            }
        })

    } else {


        const childElement = document.querySelectorAll('.white');
        childElement.forEach((ele) => {
                let id = ele.parentElement.getAttribute('id');
                let name = findPawnName(document.getElementById(id).innerHTML) + '';
                console.log(name, getMovesByPawnName(name, id));
                temp = [...new Set(temp.concat(getMovesByPawnName(name, id)))];
            })
            //  finding oopposite King place
        const childElements = document.querySelectorAll('.black');
        childElements.forEach((ele) => {
            // console.log(ele.parentElement.getAttribute('id'));
            let id = ele.parentElement.getAttribute('id');
            let name = findPawnName(document.getElementById(id).innerHTML) + '';
            // console.log(name, getMovesByPawnName(name, id));
            if (name === 'BlackKing') {
                opponentKingPlace = Number(id);
            }
            // console.log(name)
            console.log("In black block: ", name)
            if (temp.indexOf(opponentKingPlace) != -1) {
                isCheck = true;
            }
        })
    }



    console.log('ENEMY: ', isCheck)
        // }
    if (isCheck) {
        alert('Checkmate mother fucker');
        isCheck = false;
    }

}

function getMovesByPawnName(name, id) {
    let moves = [];
    switch (name) {
        case 'BlackPawn':
            moves = getPawnMoves(false, id);
            break;
        case 'BlackRook':
            moves = getRookMoves(false, id);
            break;
        case 'BlackKnight':
            moves = getKnightMoves(false, id);
            break;
        case 'BlackBishop':
            moves = getBishopMoves(false, id);
            break;
        case 'BlackQueen':
            moves = getQueenMoves(false, id);
            break;
        case 'BlackKing':
            moves = getKingMoves(false, id);
            break;
            //   for white
        case 'WhitePawn':
            moves = getPawnMoves(true, id);
            break;
        case 'WhiteRook':
            moves = getRookMoves(true, id);
            break;
        case 'WhiteKnight':
            moves = getKnightMoves(true, id);
            break;
        case 'WhiteBishop':
            moves = getBishopMoves(true, id);
            break;
        case 'WhiteQueen':
            moves = getQueenMoves(true, id);
            break;
        case 'WhiteKing':
            moves = getKingMoves(true, id);
            break;
        default:


    }
    return moves;

}


function checkforWinner(isWhite) {
    let temp = [];
    if (isWhite) {
        const childElements = document.querySelectorAll('.black');
        childElements.forEach((ele) => {
            // console.log(ele.parentElement.getAttribute('id'));
            let id = ele.parentElement.getAttribute('id');
            let name = findPawnName(document.getElementById(id).innerHTML) + '';
            // console.log(name, getMovesByPawnName(name, id));
            temp.push(name);
        });
        if (temp.indexOf('BlackKing') === -1) {
            alert("White win")
        }
    } else {
        const childElements = document.querySelectorAll('.white');
        childElements.forEach((ele) => {
            let id = ele.parentElement.getAttribute('id');
            let name = findPawnName(document.getElementById(id).innerHTML) + '';
            temp.push(name);
        });
        if (temp.indexOf('WhiteKing') === -1) {
            alert("Black win")
        }
    }
}
// function success() {
//     workHard(efforts);
//     neverGiveUp(positiveAttitude);
//     consistency(time);
//     if (notSucceed) {
//         success();
//     } else {
//         return "Success";
//     }
// }