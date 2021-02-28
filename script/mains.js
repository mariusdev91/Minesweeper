function grid() {
    const board = document.getElementById('board');
    for (let i = 1; i <= 9; ++i) {
        for (let j = 1; j <= 9; ++j) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-secondary';
            btn.style.color = 'blue';
            btn.style.backgroundColor = 'grey';
            board.appendChild(btn).setAttribute('id', + i.toString() + j.toString());
        }
        document.write('<br>');
    }
}

//set the bombs
function setBombPosition() {
    let bombPositions = [];
    for (let i = 0; i < 10; ++i) {
        let possible = true;
        while (possible) {
            let value = Math.floor(Math.random() * (99 - 11 + 1) + 11);
            if (bombPositions.includes(value)) {
                continue;
            } else {
                bombPositions[i] = value;
                possible = false;
            }
        }
    }
    const buttons = document.querySelectorAll('button');
    buttons.forEach(function (btn) {
        let btnId = btn.getAttribute('id');
        bombPositions.forEach(function (value) {
            if (btnId === value.toString()) {
                btn.style.color = 'red';
            }
        })
    })
}

//Function that checks if there is a bomb or not
function checkForBomb(){
    const board = document.getElementById('board');
    board.addEventListener('click', function(e) {
        const btnId = e.target.style.color;
        if (btnId === 'red') {
            alert('You lost!')
        } else {
            return btnId;
        }
    });
}

function setBombNeighbours() {
    const buttons = document.querySelectorAll('button');
    const one = '1';
    const two = '2';
    const three = '3';
    const four = '4';
    for (let i = 0; i < buttons.length; ++i) {
        if (buttons[i].style.color === 'red') {
            //current bomb position
            const currentPos = Number(buttons[i].id);
            //top left corner 
            const tlcn = document.getElementById((currentPos - 11).toString());
            //upper
            const un = document.getElementById((currentPos - 10).toString());
            //top right corner
            const trcn = document.getElementById((currentPos - 9).toString());
            //right
            const rn = document.getElementById((currentPos + 1).toString());
            //bottom right corner
            const brcn = document.getElementById((currentPos + 11).toString());
            //bottom 
            const bn = document.getElementById((currentPos + 10).toString());
            //bottom left corner
            const blcn = document.getElementById((currentPos + 9).toString());
            //left
            const ln = document.getElementById((currentPos - 1).toString());

            //top left corner
            if (!tlcn && !un && !trcn && !ln && !blcn) {
                if (rn.style.color === 'blue' && brcn.style.color === 'blue' && bn.style.color === 'blue') {
                    rn.id = one;
                    brcn.id = one;
                    bn.id = one;
                } else if (rn.style.color === 'red' && brcn.style.color === 'blue' && bn.style.color === 'blue') {
                    brcn.id = two;
                    bn.id = two;
                } else if (rn.style.color === 'blue' && brcn.style.color === 'red' && bn.style.color === 'blue') {
                    rn.id = two;
                    bn.id = two;
                } else if (rn.style.color === 'blue' && brcn.style.color === 'blue' && bn.style.color === 'red') {
                    rn.id = two;
                    brcn.id = two;
                } else if (rn.style.color === 'red' && brcn.style.color === 'blue' && bn.style.color === 'red') {
                    brcn.id = three;
                } else if (rn.style.color === 'red' && brcn.style.color === 'red' && bn.style.color === 'blue') {
                    bn.id = three;
                }
            } else if (!tlcn && !un && !trcn) {
                if (ln.style.color === 'blue' && blcn.style.color === 'blue' && bn.style.color === 'blue' && brcn.style.color === 'blue' && rn.style.color === 'blue') {
                    ln.id = one;
                    blcn.id = one;
                    bn.id = one;
                    brcn.id = one;
                    rn.id = one;
                }
            }
        }
    }
}

function returnMineId() {
    const mine = document.getElementById('board');
    mine.addEventListener('mouseup', function (e) {
        let btnId = e.target.getAttribute('id');
        if (typeof e === 'object') {
            if (e.button === 0) {
                if (e.target.innerText === '') {
                    e.target.innerText = btnId;
                    e.target.style.backgroundColor = 'white';
                } else {
                    e.target.innerText = '';
                    e.target.style.backgroundColor = 'grey';
                }
            } else if (e.button === 2) {
                e.target.style.backgroundColor = 'red';
            }
        }
    });
    mine.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
}

function startGame() {
    const score = document.getElementById('score');
    const life = document.getElementById('life');
    const buttons = document.querySelectorAll('button');
    let scoreValue = 1;
    ++scoreValue;
    score.innerText += ' ' + scoreValue;
    life.innerText += ' ' + 1;
    returnMineId();
    grid();
    setBombPosition();
    checkForBomb();
    setBombNeighbours();
}
startGame();