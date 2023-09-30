let timer = 10;
let hitRn;
let score = 0;

function makeBubble() {
    let clutter = "";

    for (var i = 1; i <= 119; i++) {
        let randomNum = Math.floor(Math.random() * 10 + 1);
        clutter += `<div class="bubble">${randomNum}</div>`;
    }

    document.querySelector(".pbtm").innerHTML = clutter;
}

function runTimer() {
    let timeInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerVal").textContent = timer;
        }
        else {
            clearInterval(timeInterval);
            document.querySelector(".pbtm").innerHTML = `<h1 class="center">Game Over <br> Your Score is ${score}</h1>`
            document.querySelector(".pbtm").innerHTML += `<button class="back">Back</button>`
            document.querySelector(".back").addEventListener("click", () => {
                location.reload();
            })
            highScore();
        }
    }, 1000)
}

function getNewHit() {
    hitRn = Math.floor(Math.random() * 10 + 1);
    document.querySelector("#newHit").textContent = hitRn;
}

function addScore() {
    score += 10;
    document.querySelector("#score").textContent = score;
}

// This is my approach

// function getBubbleValue() {
//     let total = document.querySelectorAll(".bubble");
//     total.forEach((va) => {
//         va.addEventListener("click", (dets) => {
//             let hitValue = Number(dets.target.textContent);
//             if (hitValue === hitRn) {
//                 addScore();
//                 makeBubble();
//                 getNewHit();
//                 getBubbleValue();
//             }
//         })
//     })
// }

document.querySelector(".pbtm").addEventListener("click", (dets) => {
    var clickedNum = Number(dets.target.textContent);
    if (clickedNum === hitRn) {
        addScore();
        makeBubble();
        getNewHit();
    }
})

function highScore() {
    let Hscore = document.querySelector("#Hscore");
    let prevScore = localStorage.getItem("HighScore");
    Hscore.textContent = prevScore;
    if (prevScore === null || score > prevScore) {
        localStorage.setItem("HighScore", score);
        Hscore.textContent = score;
    }
    else {
        Hscore.textContent = prevScore;
    }
}

let num = 0;

function runGame() {
    runTimer();
    getNewHit();
    makeBubble();
}

function startGame() {
    var playBtn = document.getElementById('play-btn');
    runGame();
    playBtn.disabled = true;
    playBtn.style.backgroundColor = "#111";
    playBtn.style.scale = 1;
    playBtn.style.opacity = .6;
    num = 1;
}

document.querySelector("#play-btn").addEventListener("click", startGame);

highScore();
