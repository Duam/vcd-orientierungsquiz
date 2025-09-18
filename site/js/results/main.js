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

function showResultCard() {
    const topKey = determineTopRoleKey();
    if (!topKey) return; // if no params, show all
    const allDivs = document.getElementsByClassName("role-card");
    for (let i = 0; i < allDivs.length; i++) {
        const div = allDivs[i];
        div.style.display = (div.id === topKey) ? '' : 'none';
    }
}

showResultCard();

