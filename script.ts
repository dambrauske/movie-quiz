const startPage = document.getElementById('start-page') as HTMLElement
const mainPage = document.querySelector('main') as HTMLElement
const finishPage = document.getElementById('finish-page') as HTMLElement
const finalPage = document.getElementById('final-page') as HTMLElement


const correctAnswers = document.getElementById('result') as HTMLElement
const totalQuestions = document.getElementById('total-questions') as HTMLElement

const startButton = document.getElementById('start-button') as HTMLElement
const startOverButton = document.getElementById('start-over-button') as HTMLElement
const finishButton = document.getElementById('finish-button') as HTMLElement

const CA: number[] = [3, 5, 8, 12, 18, 20]
let userAnswers: number[] = []
let totalUsersCorrectAnswers: number[] = []

let quizQAndADiv: HTMLElement

type Question = {
    text: string
    answers: string[]
}

const questionsAndAnswers: Question[] = [
    {
        text: 'Where were The Lord of the Rings movies filmed?',
        answers: [
            'Iceland',
            'Scotland',
            'Australia',
            'New Zealand', // true
        ]
    }, {
        text: 'Which famous Pulp Fiction scene was filmed backward?',
        answers: [
            'Vincent and Mia’s dance scene',
            'Mia’s overdose scene', // true
            'The royale with cheese scene',
            'The Ezekiel 25:17 scene',
        ]
    }, {
        text: 'Who was the first Black person to win an Oscar?',
        answers: [
            'Hattie McDaniel', // true
            'Sidney Poitier',
            'Dorothy Dandridge',
            'James Earl Jones',
        ]
    }, {
        text: 'Which is not the name of a child selected to tour the Wonka factory in Willy Wonka and the Chocolate Factory?',
        answers: [
            'Billy Warp', // true
            'Veruca Salt',
            'Mike Teavee',
            'Charlie Bucket',
        ]
    }, {
        text: 'Freddy Krueger wears a striped sweater that is which colors?',
        answers: [
            'Red and blue',
            'Orange and green',
            'Red and green', // true
            'Orange and brown',
        ]
    }, {
        text: 'What is the name of the fictional land where Frozen takes place?',
        answers: [
            'Arendelle', // true
            'Naples',
            'Florin',
            'Grimm',
        ]
    }
]

function startQuiz() {
    startPage.style.display = 'none'
    mainPage.style.display = 'block'
    finishPage.style.display = 'flex'
}

startButton.onclick = startQuiz

function appendQuestionsToHtml(questions: Question[]) {

    const answerElements: HTMLElement[] = []

    questions.forEach((question, index) => {

        const questionDiv = document.createElement('div') as HTMLElement
        questionDiv.textContent = question.text

        quizQAndADiv = document.createElement('div') as HTMLElement
        quizQAndADiv.dataset.id = String(index)
        quizQAndADiv.className = 'h-screen bg-slate-50 flex flex-col justify-center items-center gap-4 px-10 q-and-a overflow-hidden'
        quizQAndADiv.appendChild(questionDiv)

        mainPage.appendChild(quizQAndADiv)

        question.answers.forEach((answer, index) => {

            const answerEl = document.createElement('div') as HTMLElement
            answerEl.innerHTML = `
                <div>
                    <input type="radio" name="answer" value="${index}">
                    <label for="">${answer}</label>
                </div>
        `
            const answerOptionsDiv = document.createElement('div') as HTMLElement
            answerOptionsDiv.appendChild(answerEl)
            quizQAndADiv.appendChild(answerOptionsDiv)

            answerElements.push(document.createElement('div') as HTMLElement)

        })

        const nextButton = document.createElement('button') as HTMLButtonElement
        nextButton.className = 'bg-slate-300 px-4 py-2 next-button scroll-btn'
        nextButton.textContent = 'Next'
        quizQAndADiv.appendChild(nextButton)

        nextButton.onclick = handleNextButtonClick
    })
}

appendQuestionsToHtml(questionsAndAnswers)

function lastNextButtonClick() {
    const nextButtons = Array.from(document.querySelectorAll('.next-button')) as HTMLElement[]
    const lastButton = nextButtons[nextButtons.length-1]
    lastButton.addEventListener('click', (event) => {
        handleScrollToNextQuestion(event);
    });
}

lastNextButtonClick()

document
    .querySelectorAll<HTMLInputElement>('input[type="radio"]')
    .forEach((radioButton) => {
        radioButton.addEventListener('click', () => {
            radioButton.checked = true
        });
    });


function handleNextButtonClick(event: Event) : number[] {
    handleScrollToNextQuestion(event)
    const radioButtons = document.querySelectorAll("input") as NodeListOf<HTMLInputElement>
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            userAnswers.push(i)
        }
    }
    return  userAnswers
}


function handleScrollToNextQuestion(event: Event) {
    const elements = Array.from(document.querySelectorAll('.q-and-a')) as HTMLElement[]
    const button = event.currentTarget as HTMLButtonElement
    const parentElement = button.closest('.q-and-a') as HTMLElement

    // Get the dataset-id of the current element
    const currentDatasetId: number = parseInt(parentElement.dataset.id)

    // Find the next element with a dataset-id + 1
    const nextElement = elements.find((element) => parseInt(element.dataset.id)  === currentDatasetId + 1)

    if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' })
    }
}

function checkTotalScore() {

    for (let i = 0; i < CA.length; i++) {
        if (CA[i] === userAnswers[i]) {
            totalUsersCorrectAnswers.push(i)
        }
    }
}


finishButton.onclick = () => {
    checkTotalScore()

    mainPage.style.display = 'none'
    finishPage.style.display = 'none'
    finalPage.style.display = 'flex'

    totalScore()
    startOverButton.onclick = startQuiz
}

function totalScore () {
    correctAnswers.textContent = `${totalUsersCorrectAnswers.length}`
    totalQuestions.textContent = `${questionsAndAnswers.length}`
}



