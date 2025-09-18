import { RadarChart } from './radar-chart.js';

function getNumericParam(name) {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(name);
    if (value === null) return null;
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? null : n;
}

function determineTopRoleKey() {
    const keys = ["Fr", "St", "Mo", "Ne", "Vi", "Di", "Ma"];
    const scores = keys.map(k => ({ key: k, val: getNumericParam(k) }));
    const valid = scores.filter(s => s.val !== null);
    if (valid.length === 0) return null;
    valid.sort((a, b) => b.val - a.val);
    return valid[0].key;
}

function getAllScores() {
    const keys = ["Fr", "St", "Mo", "Ne", "Vi", "Di", "Ma"];
    const scores = keys.map(k => getNumericParam(k) || 0);
    return scores;
}

function showResultCard() {
    const topKey = determineTopRoleKey();
    if (!topKey) return; // if no params, show all
    const allDivs = document.getElementsByClassName("role");
    for (let i = 0; i < allDivs.length; i++) {
        const div = allDivs[i];
        div.style.display = (div.id === topKey) ? '' : 'none';
    }
}

function initRadarChart() {
    const scores = getAllScores();
    
    // Fallback-Daten für Testzwecke, wenn keine URL-Parameter vorhanden sind
    const hasData = scores.some(score => score > 0);
    const displayScores = hasData ? scores : [85, 60, 45, 70, 55, 40, 75]; // Beispiel-Daten
    
    const radarChart = new RadarChart('radarChart');
    radarChart.drawChart(displayScores);
}

// Initialisiere alles wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', function() {
    showResultCard();
    initRadarChart();
});

