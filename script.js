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
        changeBrightness(event.target, -0.1);
    }
})

//Chanbe cell filter darkness by increment
function changeBrightness(cell, increment) {
    const brightness = getFilterBrightness(cell);
    let newBrightness;
    switch (true) {
        case (brightness+increment > 1):
            newBrightness = 1;
            break;
        case (brightness+increment < 0):
            newBrightness = 0;
            break;
        default:
            newBrightness = brightness+increment;
    }
    cell.style.filter = `brightness(${newBrightness})`;
}

function getFilterBrightness(element) { //get brightness value in number format (0 to 1)
    const filter = element.style.filter;
    if (!filter.includes('brightness')) return 1;   // brightness filter not applied
    let brightness = filter.match(/(?:brightness\()(\d*\.?\d*\%?)/)[1];
    if (brightness.includes('%')) {     // convert %value to number
        brightness = brightness.replace('%','');
        brightness /= 100;
    }
    return +brightness;
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