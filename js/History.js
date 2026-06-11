
const savedHistory = localStorage.getItem("history");

let searchHistory =
    JSON.parse(savedHistory) || [];

 function addToHistory(city) {

    if (!searchHistory.includes(city)) {

        searchHistory.push(city);

        localStorage.setItem(
            "history",
            JSON.stringify(searchHistory)
        );
    }
}
function getHistory() {
    return searchHistory;
}
function clearHistoryStorage() {

    searchHistory = [];

    localStorage.removeItem("history");
}


