function arrayofMines (){ 
    const board = document.getElementById('board');
    for (let i = 1; i <= 9; ++i) {
        for (let j = 1; j <= 9; ++j) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary';
            board.appendChild(btn).setAttribute("id", + i.toString() + j.toString());
        }
        document.write("<br>");
    }
}   

function returnMineId() {
    const mine = document.getElementById('board');
    mine.addEventListener('mouseup', function(e) {
        let btnId = e.target.getAttribute('id');
        if (typeof e === 'object'){
            if (e.button === 0) {
                if (e.target.innerText === '') {
                    e.target.innerText = btnId;
                    e.target.style.backgroundColor = "blue";
                } else {
                    e.target.innerText = '';
                    e.target.style.backgroundColor = "white";
                }
            } else if (e.button === 2) {
                e.target.style.backgroundColor = "red";
            }
        }
    });
    mine.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
}

function startGame() {
    const score = document.getElementById('score');
    const life = document.getElementById('life');
    const buttons = document.querySelectorAll('button');
    score.innerText += " " + 3;
    life.innerText += " " + 1;
    returnMineId();
    arrayofMines();
}
startGame();