import { state } from './state.js';
import { updateProgressBar } from './ui.js';

export function selectOption(questionIndex, sliderValue) {
    const slider = document.getElementById(`q${questionIndex}`);
    state.userChoices[questionIndex] = parseFloat(sliderValue);
    updateSliderBackground(slider, sliderValue);
    updateProgressBar();
}

export function updateSliderBackground(slider, value) {
    if (!slider) return;
    const percentage = value * 100 + "%";
    slider.style.setProperty('--value', percentage);
}


