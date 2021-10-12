window.onload = function() {
    NewGame();
    document.getElementById("restart").onclick = NewGame;
}

let cells= [];

let empty={
    value: 16,
    top: 3,
    left: 3
};

const cellSize =150;

function NewGame() {

    let playingField = document.querySelector('.playingField');

    let level = +document.querySelector('input[name="back"]:checked').value;

    empty = {
        value: 16,
        top: 3,
        left: 3
    };

    document.getElementsByClassName('playingField')[0].innerHTML = '';
    cells.length = 0;

    cells.push(empty);

    for (let i = 1; i <= 15; i++) {
        const cell = document.createElement("div");
        cell.className = 'cell';

        const left = (i - 1) % 4;
        const top = (i - left) / 4 - 0.25; // 0.25 нужно чтобы все не ломалось из-за сдвига на 1

        cells.push({
            value: i,
            left: left,
            top: top,
            element: cell
        });

        let pattern = document.getElementById("pattern");

        if (level === 1) {
            cell.style.backgroundImage = "url('../img/easy/easy" + i + ".jpg')";
            pattern.src = "../img/easy.jpg";
        } else if (level === 2) {
            cell.style.backgroundImage = "url('../img/middle/middle" + i + ".jpg')";
            pattern.src = "../img/middle.jpg";
        } else if (level === 3) {
            cell.style.backgroundImage = "url('../img/hard/hard" + i + ".jpg')";
            pattern.src = "../img/hard.jpg";
        }
        cell.style.backgroundSize = '100%';
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        playingField.append(cell);


        cell.addEventListener('click', () => {
            move(i);
        })
    }

        for(let i = 0; i < 1000; ++i) {//"передвигаем" клетку много раз, чтобы набор выглядел случайным
            switch (Math.round(Math.random() * 3) % 4) {
                case 0:
                    if (empty.left !== 0) move(findCell(empty.top, empty.left - 1), false);
                    break; // если пустая клетка не самая левая (left !== 0), то сделать move на клетку слева от пустой
                case 1:
                    if (empty.left !== 3) move(findCell(empty.top, empty.left + 1), false);
                    break; // если пустая клетка не самая правая (left !== 3), то сделать move на клетку справа от пустой
                case 2:
                    if (empty.top !== 3) move(findCell(empty.top + 1, empty.left), false);
                    break; // если пустая клетка не самая нижняя (top !== 3), то сделать move на клетку снизу от пустой
                case 3:
                    if (empty.top !== 0) move(findCell(empty.top - 1, empty.left), false);
                    break;// если пустая клетка не самая верхняя (top !== 0), то сделать move на клетку сверху от пустой
            }

        }
}

let findCell = (top, left) => {
    return cells.find(cell => cell.top === top && cell.left === left).value
}

function move(index, winCheck=true){

    const cell=cells[index];

    const leftNeighbor = Math.abs(empty.left - cell.left);
    const topNeighbor = Math.abs(empty.top - cell.top);

    if(leftNeighbor+topNeighbor >1 ) {
        return ;
    }

    cell.element.style.left = `${ empty.left * cellSize}px`;
    cell.element.style.top = `${ empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    if (winCheck && checkWin()){
        alert("win")
    }

}

function checkWin(){

    for(let cell of cells){

        let value = (cell.left + 1) + cell.top * 4
        if (cell.value !== value){
            return false;
        }

    }
    return true;
}

