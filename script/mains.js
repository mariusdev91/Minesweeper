/*function that builds the board for the user and
sets and id for every button*/
function buidlGrid() {
    const board = document.getElementById('board');
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-secondary';
            btn.style.color = 'blue';
            btn.style.backgroundColor = 'lightgray';
            if (i == 0) {
                board.appendChild(btn).setAttribute('id', + j.toString());
            } else {
                board.appendChild(btn).setAttribute('id', + i.toString() + j.toString());
            }
        }
        document.write('<br>');
    }
}

/*function that positions the mines on the board*/
function setMines() {
    let buttons = document.querySelectorAll('button');
    let bombPositions = new Array(10);
    let gridIds = new Array(81);
    for (let i = 0; i < gridIds.length; ++i) {
        gridIds[i] = Number(buttons[i].id);
    }
    const max = 88, min = 0;
    for (let i = 0; i < bombPositions.length; ++i) {
        let possible = true;
        while (possible) {
            let bombPos = Math.floor(Math.random() * (max - min + 1) + min);
            if (gridIds.includes(bombPos) && !bombPositions.includes(bombPos)) {
                bombPositions[i] = bombPos;
                possible = false;
            } else {
                possible = true;
            }
        }
    }
    buttons.forEach(function (btn) {
        let btnId = btn.getAttribute('id');
        bombPositions.forEach(function (value) {
            if (btnId === value.toString()) {
                btn.style.color = 'darkred';
            }
        })
    });
}

/*function that creates a local board*/
function localBoard() {
    let currentPos;
    let board = new Array(9);

    for (let i = 0; i < board.length; ++i) {
        board[i] = new Array(9);
    }

    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (i == 0) {
                currentPos = j.toString();
            } else {
                currentPos = i.toString() + j.toString();
            }
            if (document.getElementById(currentPos).style.color == 'darkred') {
                board[i][j] = 0;
            } else if (document.getElementById(currentPos).style.color == 'blue') {
                board[i][j] = 1;
            }
        }
    }
    return board;
}

/*function to check for mines around our position*/
function checkForMines(x, y) {
    let board = localBoard();
    let nrOfMines = 0;

    for (let i = x - 1; i <= x + 1; ++i) {
        for (let j = y - 1; j <= y + 1; ++j) {
            if (i == x && j == y) {
                continue;
            } else if(i >=0 && i <= 8 && j >= 0 && j <= 8) {
                if (board[i][j] == 0) {
                    ++nrOfMines;
                }
            }    
        }
    }
    return nrOfMines;
}

/*function that creates a final local board, updated*/
let countMines = 0;
function finalBoard() {
    let myBoard = localBoard();
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (myBoard[i][j] == 1) {
                if (checkForMines(i, j) != 0) {
                    myBoard[i][j] = checkForMines(i, j);
                } else if (checkForMines(i, j) == 0) {
                    myBoard[i][j] = -1;
                }
            }
        }
    }
    return myBoard;
}

/*function that updates the html board with the values from our local board*/
function updateBoard() {
    let myBoard = finalBoard();
    let currentPos;

    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (i == 0) {
                currentPos = j.toString();
            } else {
                currentPos = i.toString() + j.toString();
            }
            if (myBoard[i][j] >= 1) {
                if (myBoard[i][j] == 1) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 2) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'green';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 3) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'red';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 4) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'violet';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 4) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'violet';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 5) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'maroon';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 6) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'lime';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 7) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'black';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                } else if (myBoard[i][j] == 8) {
                    document.getElementById(currentPos).style.fontWeight = 'bold';
                    document.getElementById(currentPos).style.color = 'grey';
                    document.getElementById(currentPos).id = myBoard[i][j].toString();
                }
            } else if (myBoard[i][j] == 0) {
                document.getElementById(currentPos).style.fontWeight = 'bold';
                document.getElementById(currentPos).style.color = 'darkred'
                document.getElementById(currentPos).id = 'X';
                ++countMines;
            } else if (myBoard[i][j] == -1) {
                document.getElementById(currentPos).id = ' ';
            }
        }
    }
}

/*function that checks if you clicked on a mine*/
function checkForBomb() {
    const board = document.getElementById('board');
    let buttons = document.querySelectorAll('button');
    board.addEventListener('click', function (e) {
        if (e.target.id === 'X') {
            stopTime();
            alert('You lost!');
            newGame();
            buttons.forEach(function (value) {
                if (value.id == 'X') {
                    value.innerText = value.id;
                    value.style.backgroundColor = 'white';
                }
                value.disabled = true;
            })
        }
    });
}

/*function that reveals the value inside and updates the score and flags number*/
function revealInsideValue() {
    const score = document.getElementById('score');
    const mines = document.getElementById('board');
    const flags = document.getElementById('flags');
    let buttons = document.querySelectorAll('button');
    let noOfNonMine = 0, scoreValue = 0, flagsNumber = 10;
    flags.innerText = 'Flags left: ' + flagsNumber;
    mines.addEventListener('mouseup', function (e) {
        if (typeof e === 'object') {
            if (e.button === 0) {
                if (e.target.innerText === '' && e.target.id != 'X' && e.target.style.backgroundColor == 'lightgray') {
                    ++noOfNonMine;
                    scoreValue += Number(e.target.id);
                    score.innerText = 'Your score is: ' + scoreValue;
                    e.target.innerText = e.target.getAttribute('id');
                    e.target.style.backgroundColor = 'white';
                }
            } else if (e.button === 2 && flagsNumber > 0 && e.target.style.backgroundColor == 'lightgray') {
                e.target.style.backgroundColor = 'red';
                e.target.disabled = true;
                if (flagsNumber > 0) {
                    --flagsNumber;
                }
                flags.innerText = 'Flags left: ' + flagsNumber;
            }
            if (noOfNonMine == 81 - countMines) {
                buttons.forEach(function (value) {
                    value.disabled = true;
                });
                stopTime();
                alert('Congatulations, you won!');
                newGame();
            }
        }
    });
    mines.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
}

/*function that creates the possibility to play another game*/
function newGame() {
    const divElementFirst = document.createElement('div');
    divElementFirst.style.width = '18rem';
    divElementFirst.style.margin = '0 auto';
    divElementFirst.className = 'card text-center';

    const divElementSecond = document.createElement('div');
    divElementSecond.className = 'card-body';

    const paragraph = document.createElement('p');
    paragraph.className = 'card-text';
    paragraph.innerHTML = 'Click the button below to play another game';

    const divElementButton = document.createElement('div');

    const btnYes = document.createElement('button');
    btnYes.className = 'btn btn-success';
    btnYes.id = 'newGameButton';
    btnYes.innerHTML = 'New Game';
    btnYes.addEventListener('click', function () {
        location.reload();
    });

    document.getElementById('new').appendChild(divElementFirst).appendChild(divElementSecond).appendChild(paragraph);
    divElementSecond.appendChild(divElementButton).appendChild(btnYes);
}

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let myTimer;
let totalSeconds = 0;

/*function that increments the minutes and the seconds */
function time() {
    ++totalSeconds;
    minutes.innerHTML = modifyValue(parseInt(totalSeconds / 60));
    seconds.innerHTML = modifyValue(totalSeconds % 60);
}

/*function to set timer*/
function changeTime() {
    myTimer = setInterval(time, 1000);
}

/*function that modifies the minute and seconds deppeding on the parameter taken*/
function modifyValue(value) {
    let valueAsString = value + "";
    if (valueAsString.length < 2) {
        return "0" + valueAsString;
    } else {
        return valueAsString;
    }
}

/*function to stop the timer*/
function stopTime() {
    clearInterval(myTimer);
}

function startGame() {
    buidlGrid();
    setMines();
    updateBoard();
    checkForBomb();
    revealInsideValue();
    changeTime();
}

startGame();