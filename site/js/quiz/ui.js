import { state } from './state.js';
import { showPage } from './render.js';

export function updateProgressBar() {
    const progressElement = document.getElementById('progress');
    const answeredQuestions = state.userChoices.filter(choice => choice !== undefined).length;
    const progressPercentage = (answeredQuestions / state.questions.length) * 100;
    if (progressElement) {
        progressElement.style.width = `${progressPercentage}%`;
        progressElement.textContent = `${progressPercentage}%`;
    }
}

export function nextPage() {
    const start = state.currentPage * state.questionsPerPage;
    const end = Math.min(start + state.questionsPerPage, state.questions.length);

    for (let i = start; i < end; i++) {
        if (state.userChoices[i] === undefined) {
            state.userChoices[i] = 0.5;
        }
    }

    updateProgressBar();

    if (state.currentPage < state.totalPages - 1) {
        state.currentPage++;
        showPage(state.currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

export function prevPage() {
    if (state.currentPage > 0) {
        state.currentPage--;
        showPage(state.currentPage);
    }
}


