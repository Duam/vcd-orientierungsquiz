import { state } from './state.js';
import { calculateRoleType } from './scoring.js';

export function submitQuiz() {
    const roleType = calculateRoleType(state.userChoices, state.questions);
    const urlParams = `?Fr=${roleType["Frontkämpfer:in"]}&St=${roleType["Strateg:in"]}&Mo=${roleType["Möglichmacher:in"]}&Ne=${roleType["Netzwerker:in"]}&Vi=${roleType["Visionär:in"]}&Di=${roleType["Diplomat:in"]}&Ma=${roleType["Macher:in"]}`;
    window.location.replace(`ergebnis.html${urlParams}`);
}


