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
    mine.addEventListener('click', function(e) {
        let btnId = e.target.getAttribute('id');
        if (e.target.innerText === '') {
            e.target.innerText = btnId;
        } else {
            e.target.innerText = '';
        }
    });
}

function startGame() {
    const score = document.getElementById('score');
    const life = document.getElementById('life');
    score.innerText += " " + 3;
    life.innerText += " " + 1;
    returnMineId();
    arrayofMines();
}
startGame();