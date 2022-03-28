let timeEl = document.querySelector("p.time");
let secondsLeft = 60;
let scoreEl = document.querySelector("#score");
const introEl = document.querySelector("#intro");
const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;

const answerDisplayEl = document.querySelector("#answerDisplay");
const finalEl = document.querySelector("#final");
let initialsInput = document.querySelector("#initials");
const highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];
const startBtn = document.querySelector("#start");
const choicesBtn = document.querySelectorAll("button.choicesBtn")
const choice1Btn = document.querySelector("#answer1");
const choice2Btn = document.querySelector("#answer2");
const choice3Btn = document.querySelector("#answer3");
const choice4Btn = document.querySelector("#answer4");
const submitScrBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScrBtn = document.querySelector("#clearscores");
const viewScrBtn = document.querySelector("#view-scores");

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["A) strings", "B) booleans", "C) alerts", "D) numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["A) quotes", "B) curly brackets", "C) parentheses", "D) square brackets"],
        correctAnswer: "2"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["A) numbers and strings", "B) other arrays", "C) booleans", "D) all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["A) commmas", "B) curly brackets", "C) quotes", "D) parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["A) Javascript", "B) terminal/bash", "C) for loops", "D) console.log"],
        correctAnswer: "3"
    }
];


var setTime = function() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
};

var startQuiz = function() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
};

var setQuestion = function(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        choice1Btn.textContent = questions[id].answers[0];
        choice2Btn.textContent = questions[id].answers[1];
        choice3Btn.textContent = questions[id].answers[2];
        choice4Btn.textContent = questions[id].answers[3];
    }
};

var checkAnswer = function(event) {
    event.preventDefault();

    answerDisplayEl.style.display = "block";
    let p = document.createElement("p");
    answerDisplayEl.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
};

var addScore = function(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });


    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });

    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
};

var storeScores = function() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
};

var displayScores = function() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (!storedScoreList) {
        scoreList = storedScoreList;
    }
};

var clearScores = function() {
    scoreListEl.innerHTML="";
    localStorage.clear();
};

startBtn.addEventListener("click", startQuiz);

choicesBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function() {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 60;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);

viewScrBtn.addEventListener("click", function() {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("There are no highscores available.");
    }
});