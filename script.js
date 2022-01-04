let currentSize = 50;
const grid = document.querySelector('.grid');
const range = document.querySelector('#range');
const rangeOutput = document.querySelector('.sliders div');
rangeOutput.textContent = `${currentSize} x ${currentSize}`;

for(i=0; i<(currentSize**2); i++) {                                              //default cell count
    let cell = document.createElement('div');
    cell.classList.add('cell');
    //cell.textContent = `${i+1}`
    cell.addEventListener('mouseover', function() {
        cell.style.backgroundColor = 'black';
    });
    grid.appendChild(cell);
}


range.oninput = function() {
    rangeOutput.textContent = `${range.value} x ${range.value}`;
    grid.style.setProperty('--grid-rows', range.value);
    grid.style.setProperty('--grid-cols', range.value);
    let difference = (range.value**2) - (currentSize**2)

    switch (difference > 0) {
        case true:
            addingCells(currentSize, difference);
            break;
        case false:
            subtractingCells(difference * -1)
            break; 
    }
    currentSize = range.value;
}

function addingCells (currentSize, toAdd) {
    for(i=1; i <= toAdd; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        //cell.textContent = `${(currentSize**2)+i}`;
        cell.addEventListener('mouseover', function() {
            cell.style.backgroundColor = 'black';
        });
        grid.appendChild(cell);
    }
}

function subtractingCells (toSub) {
    for (i=1; i <= toSub; i++)
    grid.removeChild(grid.lastChild);
}