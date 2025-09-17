import { loadData } from './data.js';
import { nextPage, prevPage } from './ui.js';
import { selectOption } from './slider.js';
import { submitQuiz } from './navigation.js';
import { showPage } from './render.js';
import { state } from './state.js';

window.nextPage = nextPage;
window.prevPage = prevPage;
window.selectOption = selectOption;
window.submitQuiz = submitQuiz;
window.showPage = showPage;

loadData();


