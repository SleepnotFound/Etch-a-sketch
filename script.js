let currentSize = 50;                                                   //lenght of one side of the canvas
const grid = document.querySelector('.grid');
const range = document.querySelector('#range');
const rangeOutput = document.querySelector('.sliders div');
rangeOutput.textContent = `${currentSize} x ${currentSize}`;
let color = null;
let btnSelect = null;

addingCells(currentSize**2);

//slider handles grid size and cell count
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
            cell.style.backgroundColor = fillCell(event.target, btnSelect);
            //console.log(event.target);
        });
        grid.appendChild(cell);
    }
}
function subtractingCells (toSub) {
    for (i=1; i <= toSub; i++)
    grid.removeChild(grid.lastChild);
}

//button handles choosing new colors
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        pickcolor(button.classList);
        //console.log(button.classList);
    })
})
function pickcolor(domColor) {
    switch (domColor.value) {
        case "black":
            btnSelect = 'black';
            break;
        case 'gray':
            btnSelect = 'gray';
            break;
        case 'rainbow':
            btnSelect = 'rainbow';
            break;
        case 'reset':
            const nodes = grid.childNodes;
            for (i=0; i < nodes.length; i++) {
                nodes[i].style.backgroundColor = "white";
            }
            break;
    }
}

//colors cells approprietly
function fillCell(target,btn) {
    switch (btn) {
        case 'black':
            return 'black';
            break;
        case 'gray':
            return grayscale(target);
            break;
        case 'rainbow':
            return rainbow();
            break;
        default:

    }
}

function grayscale (target) {
    let bgColor = target.style.backgroundColor;
    bgColor = bgColor.slice(4,bgColor.length-1)
    bgColor = bgColor.replace(/ /g, '')
    let values = bgColor.split(',')

    if ((values[0]%25 == 0) && (values[1]%25 == 0) && (values[2]%25 == 0)) {
        values[0] -= 25;
        values[1] -= 25;
        values[2] -= 25;

        return `rgb(${values[0]}, ${values[1]}, ${values[2]})`
    }
    else {
        return `rgb(250, 250, 250)`
    }
}

function rainbow() {
    let R = Math.floor(Math.random() * 255)
    let G = Math.floor(Math.random() * 255)
    let B = Math.floor(Math.random() * 255)
    return `rgb(${R}, ${G}, ${B})`
}