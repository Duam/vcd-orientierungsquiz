export function getUrlParameterValueFromKey(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return null;
}

export function showOnlyPersonalityType() {
    const personalityType = getUrlParameterValueFromKey("key");
    if (personalityType === null) return;

    const allDivs = document.getElementsByClassName("card");
    for (let i = 0; i < allDivs.length; i++) {
        const div = allDivs[i];
        if (div.id !== personalityType) {
            div.style.display = 'none';
        }
    }
}

showOnlyPersonalityType();


