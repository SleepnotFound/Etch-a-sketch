let currentSize = 50;                                                   //lenght of one side of the canvas
const grid = document.querySelector('.grid');
const range = document.querySelector('#range');
const rangeOutput = document.querySelector('.sliders div');
rangeOutput.textContent = `${currentSize} x ${currentSize}`;
let color = 'black';

addingCells(currentSize**2);                                            //default grid size

range.oninput = function() {
    rangeOutput.textContent = `${range.value} x ${range.value}`;
    grid.style.setProperty('--grid-rows', range.value);
    grid.style.setProperty('--grid-cols', range.value);
    let difference = (range.value**2) - (currentSize**2)

    switch (difference > 0) {
        case true:
            addingCells(difference);
            break;
        case false:
            subtractingCells(difference * -1)
            break; 
    }
    currentSize = range.value;
}

function addingCells (toAdd) {
    for(i=1; i <= toAdd; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', function() {
            cell.style.backgroundColor = color;
        });
        grid.appendChild(cell);
    }
}

function subtractingCells (toSub) {
    for (i=1; i <= toSub; i++)
    grid.removeChild(grid.lastChild);
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        pickcolor(button.classList);
        console.log('new color:' + color);
    })
})

function pickcolor(domColor) {
    switch (domColor.value) {
        case "black":
            color = 'green';
            break;
        case 'gray':
            color = 'red';
            break;
        case 'rainbow':
            color = 'blue';
            break;
        case 'reset':
            const nodes = grid.childNodes;
            for (i=0; i < nodes.length; i++) {
                nodes[i].style.backgroundColor = "white";
            }
            break;
    }
}