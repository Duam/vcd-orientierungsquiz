// script.js

let questions = [];
let currentPage = 0;
const questionsPerPage = 6;
let currentQuestion = 0;
let userChoices = [];
let totalPages = 0;


async function loadData() {
    // Fetch questions
    const questionsResponse = await fetch('questions.json');
    questions = await questionsResponse.json();
    totalPages = Math.ceil(questions.length / questionsPerPage);
    
    // Fetch personality type descriptions
    const personalityResponse = await fetch('personality_types.json');
    personalityDescriptions = await personalityResponse.json();
    
    // Initialize userChoices array with undefined values
    userChoices = new Array(questions.length);
    
    // Start the quiz
    showPage(currentPage);
    console.log(questions[1].statement)
}

// Call loadData to start the quiz
loadData();


function showQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    const questionObj = questions[index];

    const labels = ["Agree", "", "", "Neutral", "", "", "Disagree"];

    let scaleButtons = '<div class="scale">';
    for (let i = 0; i <= 6; i++) {
        scaleButtons += `
            <div class="scale-item">
                <button onclick="selectOption(${i})">${i}</button>
                <span>${labels[i]}</span>
            </div>
        `;
    }
    scaleButtons += '</div>';

    quizContainer.innerHTML = `
        <h2>${questionObj.statement}</h2>
        ${scaleButtons}
    `;
}


function showPage(pageIndex) {
    if (!questions.length) {
        // Data not loaded yet
        return;
    }

    const quizContainer = document.getElementById('quiz-container');
    const start = pageIndex * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);
    const pageQuestions = questions.slice(start, end);

    let questionHTML = '';
    pageQuestions.forEach((questionObj, idx) => {
        const questionNumber = start + idx + 1;
        questionHTML += `
            <div class="question-block">
                <h3>${questionNumber}. ${questionObj.title}</h3>
                <p>${questionObj.statement}</p>
                ${generateScaleSlider(questionNumber - 1)}
            </div>
        `;
    });

    const paginationButtons = `
        <div class="pagination">
            ${pageIndex > 0 ? '<button onclick="prevPage()">Previous</button>' : '<div></div>'}
            ${pageIndex < totalPages - 1 ? '<button onclick="nextPage()">Next</button>' : '<button onclick="submitQuiz()">Submit</button>'}
        </div>
    `;

    quizContainer.innerHTML = `
        ${generateProgressBar()}
        ${questionHTML}
        ${paginationButtons}
    `;

    updateProgressBar();
}


function generateScaleSlider(questionIndex) {
    const value = userChoices[questionIndex] !== undefined ? userChoices[questionIndex] : 0.5; // Default to 0.5 if undefined
    
    let html = '<div class="scale">';
    
    
    html += `
    <div class="slider-container">
        <input type="range" min="0" max="1" step="0.01" value="${value}" class="slider" id="q${questionIndex}" oninput="selectOption(${questionIndex}, this.value)">
        <div class="scale-labels">
            <span class="scale-label left-label">${questions[questionIndex].leftLabel}</span>
            <span class="scale-label right-label">${questions[questionIndex].rightLabel}</span>
        </div>
    </div>
    `;
    
    html += ``;
    html += ``;
    html += '</div>';

    // After the slider is added to the DOM, update its background
    setTimeout(() => {
        const slider = document.getElementById(`q${questionIndex}`);
        updateSliderBackground(slider, value);
    }, 0);

    return html;
}


function nextPage() {
    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);

    // Assign default value (0.5) to unanswered questions on the current page
    for (let i = start; i < end; i++) {
        if (userChoices[i] === undefined) {
            userChoices[i] = 0.5; // Default value
        }
    }

    // Update progress bar
    updateProgressBar();

    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
    }
}



function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

function generateProgressBar() {
    return `
        <div class="progress-bar">
            <div id="progress" class="progress"></div>
        </div>
    `;
}

function updateProgressBar() {
    const progressElement = document.getElementById('progress');
    const answeredQuestions = userChoices.filter(choice => choice !== undefined).length;
    const progressPercentage = (answeredQuestions / questions.length) * 100;
    progressElement.style.width = `${progressPercentage}%`;
}


function selectOption(questionIndex, sliderValue) {
    const slider = document.getElementById(`q${questionIndex}`);
    userChoices[questionIndex] = parseFloat(sliderValue);
    updateSliderBackground(slider, sliderValue);
    updateProgressBar();
}

function updateSliderBackground(slider, value) {
    const percentage = value * 100 + "%";
    slider.style.setProperty('--value', percentage);
}


function submitQuiz() {
    showResults();
}


function calculatePersonalityType() {
    let scores = {
        "E": 0,
        "I": 0,
        "S": 0,
        "N": 0,
        "T": 0,
        "F": 0,
        "J": 0,
        "P": 0
    };

    userChoices.forEach((value, index) => {
        const type = questions[index].type;
        const [firstTrait, secondTrait] = type.split('/');

        const selectedValue = value; // Value between 0 and 1

        // Lower values favor the first trait; higher values favor the second trait
        const midpoint = 0.5;

        if (selectedValue <= midpoint) {
            scores[firstTrait] += (midpoint - selectedValue);
        } else {
            scores[secondTrait] += (selectedValue - midpoint);
        }
    });

    const personalityType =
        (scores["E"] >= scores["I"] ? "E" : "I") +
        (scores["S"] >= scores["N"] ? "S" : "N") +
        (scores["T"] >= scores["F"] ? "T" : "F") +
        (scores["J"] >= scores["P"] ? "J" : "P");

    return personalityType;
}



function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const personalityType = calculatePersonalityType();
    const personalityData = personalityDescriptions[personalityType];

    if (personalityData) {
        const { title, description, focus_points } = personalityData;

        // Generate HTML for focus points
        let focusPointsHTML = '';
        if (Array.isArray(focus_points) && focus_points.length > 0) {
            focusPointsHTML = '<h3>Schwerpunkte:</h3><ul>';
            focus_points.forEach(point => {
                focusPointsHTML += `<li>${point}</li>`;
            });
            focusPointsHTML += '</ul>';
        }

        quizContainer.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
            ${focusPointsHTML}
        `;
    } else {
        quizContainer.innerHTML = `
            <h2>Your Personality Type is ${personalityType}</h2>
            <p>Description not found.</p>
        `;
    }
}



showPage(currentPage);
