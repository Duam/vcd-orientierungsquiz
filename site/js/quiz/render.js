import { state } from './state.js';
import { updateSliderBackground } from './slider.js';
import { updateProgressBar } from './ui.js';

export function generateScaleSlider(questionIndex) {
    const value = state.userChoices[questionIndex] !== undefined ? state.userChoices[questionIndex] : 0.5;

    let html = '<div class="scale">';
    html += `
    <div class="slider-container">
        <input type="range" min="0" max="1" step="0.01" value="${value}" class="slider" id="q${questionIndex}" oninput="selectOption(${questionIndex}, this.value)">
        <div class="scale-labels">
            <span class="scale-label left-label">${state.questions[questionIndex].leftLabel}</span>
            <span class="scale-label right-label">${state.questions[questionIndex].rightLabel}</span>
        </div>
    </div>
    `;
    html += '</div>';

    setTimeout(() => {
        const slider = document.getElementById(`q${questionIndex}`);
        if (slider) updateSliderBackground(slider, value);
    }, 0);

    return html;
}

export function generateProgressBar() {
    return `
        <div class="progress-bar">
            <div id="progress" class="progress"/>
        </div>
    `;
}

export function showPage(pageIndex) {
    if (!state.questions.length) return;

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    
    const start = pageIndex * state.questionsPerPage;
    const end = Math.min(start + state.questionsPerPage, state.questions.length);
    const pageQuestions = state.questions.slice(start, end);

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
        ${pageIndex > 0 ? '<button class="btn btn-previous" onclick="prevPage()">Zurück</button>' : '<div></div>'}
        ${pageIndex < state.totalPages - 1 ? '<button class="btn btn-next" onclick="nextPage()">Weiter</button>' : '<button class="btn btn-next" onclick="submitQuiz()">Fertig</button>'}
        </div>
    `;

    const progressBar = generateProgressBar();
    const progressBarContainer = document.createElement('div');
    progressBarContainer.innerHTML = progressBar;
    quizContainer.appendChild(progressBarContainer);

    const questionHTMLContainer = document.createElement('div');
    questionHTMLContainer.innerHTML = questionHTML;
    quizContainer.appendChild(questionHTMLContainer);

    const paginationButtonsContainer = document.createElement('div');
    paginationButtonsContainer.innerHTML = paginationButtons;
    quizContainer.appendChild(paginationButtonsContainer);

    updateProgressBar();
}


