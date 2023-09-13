let score = 0;
const playerImage = document.getElementById('playerImage');
const bulletImage = document.getElementById('bulletImage');
const targetImage = document.getElementById('targetImage');
const scoreDisplay = document.getElementById('score');
const playerNameInput = document.getElementById('playerName');
const welcomeMessage = document.getElementById('welcomeMessage');
const nameDisplay = document.getElementById('nameDisplay');
const nameInputDiv = document.getElementById('nameInput');

// Randomly position the target image
function randomPosition(element) {
    const x = Math.random() * (750); 
    const y = Math.random() * (550); 
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

randomPosition(targetImage);

function isColliding(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(aRect.top > bRect.bottom || aRect.bottom < bRect.top || aRect.right < bRect.left || aRect.left > bRect.right);
}

document.addEventListener('keydown', function(event) {
    let playerTop = playerImage.offsetTop;

    switch (event.code) {
        case 'Space':
            bulletImage.style.display = "block";
            let bulletLeft = playerImage.offsetLeft + 50; // starts at the right edge of the playerImage
            let bulletTop = playerImage.offsetTop + 15;   // slightly below the top to be more centered
            bulletImage.style.left = bulletLeft + "px";
            bulletImage.style.top = bulletTop + "px";
            
            let shootInterval = setInterval(() => {
                bulletLeft += 10;  // move bullet to the right
                bulletImage.style.left = bulletLeft + "px";
                
                if (isColliding(bulletImage, targetImage)) {
                    score++;
                    scoreDisplay.textContent = score;
                    clearInterval(shootInterval);
                    bulletImage.style.display = "none";
                    randomPosition(targetImage);
                }
    
                if (bulletLeft > 800) {
                    clearInterval(shootInterval);
                    bulletImage.style.display = "none";
                }
            }, 20);
            break;
        case 'ArrowUp':
            playerTop = Math.max(0, playerTop - 10); // move upwards
            playerImage.style.top = playerTop + "px";
            break;
        case 'ArrowDown':
            playerTop = Math.min(600 - 50, playerTop + 10); // move downwards, ensuring the player image doesn't go out of bounds
            playerImage.style.top = playerTop + "px";
            break;
    }
});


function submitName() {
    nameDisplay.textContent = playerNameInput.value;
    welcomeMessage.style.display = "block";
    nameInputDiv.style.display = "none";
}
