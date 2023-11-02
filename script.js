const INITIAL_GRID = 16;

const EASContainer = document.querySelector('#eas-container');

//create initial grid
window.addEventListener('load', makeGrid(INITIAL_GRID))

function makeGrid(size) {

    clearGrid();

    for (let row = 0; row < size; row++) {
        addEASRow(size);
    }
}

function clearGrid() {
    while (EASContainer.firstChild) {
        EASContainer.lastChild.remove();
    }
}

function addEASRow(size) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('eas-row');
    for (let cell = 0; cell < size; cell++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('eas-cell');
        rowElement.appendChild(cellElement);
    }
    EASContainer.appendChild(rowElement);
}


//drawing
EASContainer.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('eas-cell')) {
        etch(event.target);
    }
})

function etch(cell) {
    const etchedClass = 'etched';
    if (cell.classList.contains(etchedClass)) return;

    cell.classList.add(etchedClass);
    return;
}