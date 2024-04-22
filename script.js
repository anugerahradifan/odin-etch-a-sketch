let container = document.querySelector('.container');

let gridSize = 8;
createGrid(gridSize);
addGridSizeStatus(gridSize)

let newSketchButton = document.querySelector('button#new-sketch');
newSketchButton.addEventListener('click', resetSketch);

let clearSketchButton = document.querySelector('button#clear-sketch');
clearSketchButton.addEventListener('click', clearSketch);

let randomColorButton = document.querySelector('button#random-color');
randomColorButton.addEventListener('click', toggleRandomColor);
randomColorButton.addEventListener('click', function() {
    randomColorButton.classList.toggle('color-toggle');
});

let isMouseDown = false;
let isRandomColorButtonToggled = false;
container.addEventListener('mousedown', startColoring);
container.addEventListener('mouseup', stopColoring);
container.addEventListener('mousemove', colorGrid);
container.addEventListener('mousemove', randomizeGridColor);




function addGridSizeStatus(gridSize) {
    let gridSizeStatus = document.createElement('div');
    document.body.insertBefore(gridSizeStatus, container);
    gridSizeStatus.className = 'grid-size-status';
    gridSizeStatus.textContent = `Gride size: ${gridSize} x ${gridSize}`;
}

function removeGridSizeStatus() {
    let gridSizeStatus = document.querySelector('.grid-size-status');
    if (gridSizeStatus) {
        gridSizeStatus.parentNode.removeChild(gridSizeStatus);
    }
}

function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let gridColumn = document.createElement('div');
        gridColumn.className = 'grid-column';
        container.appendChild(gridColumn)
        for (let j = 0; j < gridSize; j++) {
            let grid = document.createElement('div');
            grid.className = 'grid';
            gridColumn.appendChild(grid);
            grid.style.width = `${640 / gridSize}px`;
            grid.style.height = `${640 / gridSize}px`;
            grid.style.backgroundColor = 'white';
        }
    }
}

function colorGrid(event) {
    if (isMouseDown && !isRandomColorButtonToggled) {
        if (event.target.classList.contains('grid') && event.target.style.backgroundColor == 'white') {
            event.target.style.backgroundColor = 'black';
        }
    }
}

function toggleRandomColor() {
    if (!isRandomColorButtonToggled) {
        isRandomColorButtonToggled = true;
    } else {
        isRandomColorButtonToggled = false;
    }
}

function randomizeGridColor(event) {
    if (isMouseDown && isRandomColorButtonToggled && event.target.style.backgroundColor == 'white') {
        if (event.target.classList.contains('grid')) {
            event.target.style.backgroundColor = `rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`;
        }
    }
}

function startColoring(event) {
    isMouseDown = true;
    colorGrid(event);
    randomizeGridColor(event);
}

function stopColoring() {
    isMouseDown = false;
}

function randomRGBValue() {
    value = Math.floor(Math.random() * 256);
    return value;
}

function clearSketch() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
    createGrid(gridSize);
    addGridSizeStatus(gridSize);
    removeGridSizeStatus(); 
}

function resetSketch() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
    gridSize = parseInt(window.prompt('Enter grid size:'));
    while (isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
        gridSize = parseInt(window.prompt('Wrong values (must be positive number and less than 100), enter again:'), 10);
    }
    createGrid(gridSize);
    addGridSizeStatus(gridSize);
    removeGridSizeStatus();
};