const puzzle = document.getElementById('puzzle');
const message = document.getElementById('message');
const correctOrder = [...Array(20).keys()].map(n => n + 1);
let pieces = [...correctOrder];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkSolution() {
    if (JSON.stringify(pieces) === JSON.stringify(correctOrder)) {
        message.textContent = 'Secret code: 12345';
    } else {
        message.textContent = '';
    }
}

function swapPieces(index1, index2) {
    [pieces[index1], pieces[index2]] = [pieces[index2], pieces[index1]];
    const img1 = document.getElementById(`piece-${index1 + 1}`);
    const img2 = document.getElementById(`piece-${index2 + 1}`);
    img1.setAttribute('src', `puzzle1/${pieces[index1]}.png`);
    img2.setAttribute('src', `puzzle1/${pieces[index2]}.png`);
    checkSolution();
}

function createPuzzle() {
    shuffleArray(pieces);
    for (let i = 0; i < 20; i++) {
        const img = document.createElement('img');
        img.setAttribute('id', `piece-${i + 1}`);
        img.setAttribute('src', `puzzle1/${pieces[i]}.png`);
        img.classList.add('piece');
        img.addEventListener('click', () => {
            if (i > 0) swapPieces(i, i - 1);
            else swapPieces(0, 19);
        });
        puzzle.appendChild(img);
    }
}

createPuzzle();