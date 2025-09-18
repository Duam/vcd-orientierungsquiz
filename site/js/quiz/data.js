import { state } from './state.js';
import { showPage } from './render.js';

export async function loadData() {
    const questionsResponse = await fetch('questions.json');
    state.questions = await questionsResponse.json();
    state.totalPages = Math.ceil(state.questions.length / state.questionsPerPage);

    state.userChoices = new Array(state.questions.length);

    showPage(state.currentPage);
}


