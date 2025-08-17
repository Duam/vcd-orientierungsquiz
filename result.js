// result.js

let questions = [];
let currentPage = 0;
const questionsPerPage = 4;
let currentQuestion = 0;
let userChoices = [];
let totalPages = 0;

function getUrlParameterValueFromKey(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    } 
    return null
}

function showOnlyPersonalityType() {
    
    const personalityType = getUrlParameterValueFromKey("key")

    // If no url parameter was given, then show the whole page (dont hide anything)
    if (personalityType === null) {
        return
    }

    // Loop over all divs inside the body and hide the divs
    const allDivs = document.getElementsByClassName("card")    
    for (var i = 0; i < allDivs.length; i++) {
        div = allDivs[i]
        if (div.id !== personalityType) {
            div.style.display = 'none'
        }
    }
}

showOnlyPersonalityType();