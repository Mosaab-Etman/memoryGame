
// Starting game & remove overlay page 

let overlayPage = document.querySelector('.overlayIntro'),
    nameBox = document.getElementById('name'),
    startBtn = document.getElementById('start'),
    warning = document.querySelector('.warning'),
    playerName = document.querySelector('.playerName');

startBtn.addEventListener('click', function() {

    if (nameBox.value == '') {
        warning.style.animation = 'fadingIn 1s';
        warning.style.opacity = '1';
    }
    else {
        playerName.innerHTML = `Player Name: ${nameBox.value}`;
        overlayPage.style.animation = 'fadingOut 1s';
        document.querySelector('#soundStart').play();
        

        setTimeout(() => {
            overlayPage.style.display = 'none'
        }, 1000)
    }
})

// Shuffling the blocks order

let blocksContainer = document.querySelector('.blocksContainer'),
    blocks = Array.from(blocksContainer.children);


let orderArray = Array.from(blocks.keys());

shuffle(orderArray);

blocks.forEach((block, index) => {

    block.style.order = orderArray[index];

    block.addEventListener('click', function() {

        flipBlock(this);
    })

})

// The Shuffle Function 

function shuffle(array) {

    let temp,
        random;

    for (let current = (array.length-1); current > 0; current--) {

        random = Math.floor(Math.random() * current)

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;

    }

    return array;

}   

// The flip block function

function flipBlock(clickedBlock) {

    clickedBlock.classList.add('isFlipped');

    let flippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('isFlipped'));

    if (flippedBlocks.length == 2) {

        stopClicking()
        checkMatched(flippedBlocks[0], flippedBlocks[1])
    }
}

// StopClicking Function

function stopClicking() {

    blocksContainer.style.pointerEvents = 'none';

    setTimeout(() => {

        blocksContainer.style.pointerEvents = 'auto';
    }, 1000)
}

// Check Matched function

function checkMatched(firstBlock, secondBlock) {

    let wrongTries = document.querySelector('.wrongTries span');

    if (firstBlock.getAttribute('data-charachter') == secondBlock.getAttribute('data-charachter')) {

        firstBlock.classList.remove('isFlipped');
        secondBlock.classList.remove('isFlipped');

        firstBlock.classList.add('isMatched');
        secondBlock.classList.add('isMatched');

        document.querySelector('#success').play();

    }   else {

        setTimeout(() => {

            firstBlock.classList.remove('isFlipped');
            secondBlock.classList.remove('isFlipped');

            document.querySelector('#error').play();

            wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1; 

        }, 1000)
    }
}



