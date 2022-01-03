let size = 14;

const grid = document.querySelector('.grid');
//grid.style.gridTemplateColumns = size;
for(i=0; i<(size*size); i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = `${i+1}`
    grid.appendChild(cell);
}