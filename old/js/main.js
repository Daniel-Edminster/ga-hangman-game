function getRandomWord()
{
    fetch("https://wordsapiv1.p.rapidapi.com/words/?=random=true&frequencymax=8", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "d47465c901msh33245ead01486fap1ff449jsn107f8654a8d5"
        }
    })
    .then(response => {
        console.log(response.json);
    })
    .catch(err => {
        console.log(err);
    });
}

window.onload = function() 
{
    getRandomWord();
}