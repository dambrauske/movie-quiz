"use strict";
const startPage = document.getElementById('start-page');
const mainPage = document.querySelector('main');
const finishPage = document.getElementById('finish-page');
const finalPage = document.getElementById('final-page');
const correctAnswers = document.getElementById('result');
const totalQuestions = document.getElementById('total-questions');
const startButton = document.getElementById('start-button');
const startOverButton = document.getElementById('start-over-button');
const finishButton = document.getElementById('finish-button');
const CA = [3, 5, 8, 12, 18, 20];
let userAnswers = [];
let totalUsersCorrectAnswers = [];
let quizQAndADiv;
const questionsAndAnswers = [
    {
        text: 'Where were The Lord of the Rings movies filmed?',
        answers: [
            'Iceland',
            'Scotland',
            'Australia',
            'New Zealand',
        ]
    }, {
        text: 'Which famous Pulp Fiction scene was filmed backward?',
        answers: [
            'Vincent and Mia’s dance scene',
            'Mia’s overdose scene',
            'The royale with cheese scene',
            'The Ezekiel 25:17 scene',
        ]
    }, {
        text: 'Who was the first Black person to win an Oscar?',
        answers: [
            'Hattie McDaniel',
            'Sidney Poitier',
            'Dorothy Dandridge',
            'James Earl Jones',
        ]
    }, {
        text: 'Which is not the name of a child selected to tour the Wonka factory in Willy Wonka and the Chocolate Factory?',
        answers: [
            'Billy Warp',
            'Veruca Salt',
            'Mike Teavee',
            'Charlie Bucket',
        ]
    }, {
        text: 'Freddy Krueger wears a striped sweater that is which colors?',
        answers: [
            'Red and blue',
            'Orange and green',
            'Red and green',
            'Orange and brown',
        ]
    }, {
        text: 'What is the name of the fictional land where Frozen takes place?',
        answers: [
            'Arendelle',
            'Naples',
            'Florin',
            'Grimm',
        ]
    }
];
function startQuiz() {
    startPage.style.display = 'none';
    mainPage.style.display = 'block';
    finishPage.style.display = 'flex';
}
startButton.onclick = startQuiz;
function appendQuestionsToHtml(questions) {
    const answerElements = [];
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.textContent = question.text;
        quizQAndADiv = document.createElement('div');
        quizQAndADiv.dataset.id = String(index);
        quizQAndADiv.className = 'h-screen bg-slate-50 flex flex-col justify-center items-center gap-4 px-10 q-and-a overflow-hidden';
        quizQAndADiv.appendChild(questionDiv);
        mainPage.appendChild(quizQAndADiv);
        question.answers.forEach((answer, index) => {
            const answerEl = document.createElement('div');
            answerEl.innerHTML = `
                <div>
                    <input type="radio" name="answer" value="${index}">
                    <label for="">${answer}</label>
                </div>
        `;
            const answerOptionsDiv = document.createElement('div');
            answerOptionsDiv.appendChild(answerEl);
            quizQAndADiv.appendChild(answerOptionsDiv);
            answerElements.push(document.createElement('div'));
        });
        const nextButton = document.createElement('button');
        nextButton.className = 'bg-slate-300 px-4 py-2 next-button scroll-btn';
        nextButton.textContent = 'Next';
        quizQAndADiv.appendChild(nextButton);
        nextButton.onclick = handleNextButtonClick;
    });
}
appendQuestionsToHtml(questionsAndAnswers);
function lastNextButtonClick() {
    const nextButtons = Array.from(document.querySelectorAll('.next-button'));
    const lastButton = nextButtons[nextButtons.length - 1];
    lastButton.addEventListener('click', (event) => {
        handleScrollToNextQuestion(event);
    });
}
lastNextButtonClick();
document
    .querySelectorAll('input[type="radio"]')
    .forEach((radioButton) => {
    radioButton.addEventListener('click', () => {
        radioButton.checked = true;
    });
});
function handleNextButtonClick(event) {
    handleScrollToNextQuestion(event);
    const radioButtons = document.querySelectorAll("input");
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            userAnswers.push(i);
        }
    }
    return userAnswers;
}
function handleScrollToNextQuestion(event) {
    const elements = Array.from(document.querySelectorAll('.q-and-a'));
    const button = event.currentTarget;
    const parentElement = button.closest('.q-and-a');
    // Get the dataset-id of the current element
    const currentDatasetId = parseInt(parentElement.dataset.id);
    // Find the next element with a dataset-id + 1
    const nextElement = elements.find((element) => parseInt(element.dataset.id) === currentDatasetId + 1);
    if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
    }
}
function checkTotalScore() {
    for (let i = 0; i < CA.length; i++) {
        if (CA[i] === userAnswers[i]) {
            totalUsersCorrectAnswers.push(i);
        }
    }
}
finishButton.onclick = () => {
    checkTotalScore();
    mainPage.style.display = 'none';
    finishPage.style.display = 'none';
    finalPage.style.display = 'flex';
    totalScore();
    startOverButton.onclick = startQuiz;
};
function totalScore() {
    correctAnswers.textContent = `${totalUsersCorrectAnswers.length}`;
    totalQuestions.textContent = `${questionsAndAnswers.length}`;
}
