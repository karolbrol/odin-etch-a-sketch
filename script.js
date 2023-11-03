const INITIAL_GRID = 16;

const EASContainer = document.querySelector('#eas-container');

//create initial grid
window.addEventListener('load', makeGrid(INITIAL_GRID))

function makeGrid(size) {

    if (size === null) return;
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
/* Version with one color
function etch(cell) {
    const etchedClass = 'etched';
    if (cell.classList.contains(etchedClass)) return;

    cell.classList.add(etchedClass);
    return;
}
*/

//Iteratively darken
function etch(cell) {
    let bgColor = parseRGB(window.getComputedStyle(cell, null).backgroundColor)
    bgColor.r -= 25;
    bgColor.g -= 25;
    bgColor.b -= 25;
    cell.style.backgroundColor = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
}

//handle resize
const resizeBtn = document.querySelector('#resize-btn');
resizeBtn.addEventListener('click', () => {makeGrid(getGridSize())});

function getGridSize() {
    const gridSize = +window.prompt('Specify the grid size from range 2 to 100.')
    if (!(Number.isInteger(gridSize) && gridSize>= 2 && gridSize <= 100)) {
        window.alert('Invalid grid size!');
        return null;
    }
    return gridSize;
}

function parseRGB(textRGB) {
    //convert from 'rgb(#,#,#)' format to object
    textRGB = textRGB.slice(4,-1);
    textRGB = textRGB.split(',');
    return {r: +textRGB[0], g: +textRGB[1], b: +textRGB[2]};
}