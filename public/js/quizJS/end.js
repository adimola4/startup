// const username = document.getElementById('username');
// const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore;

const numOfQ = document.getElementById('questionsNumber');
const QUESTIONS = localStorage.getItem('MAX');

numOfQ.innerText = `ענית נכון על: ${mostRecentScore/10}/${QUESTIONS}`;

// const ans = document.getElementById('answers');
// ans.innerText = mostRecentScore/10; 

// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// const MAX_HIGH_SCORES = 5;

// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value;
// });

// saveHighScore = (e) => {
//     e.preventDefault();

//     const score = {
//         score: mostRecentScore,
//         name: username.value,
//     };

    // highScores.push(score);
    // highScores.sort((a, b) => b.score - a.score);
    // highScores.splice(5);

    // localStorage.setItem('highScores', JSON.stringify(highScores));
//     window.location.assign('/');
// };


// Example POST request to the server
const results = {
    quizID: '123abc',
    answers: [
        0,             // American question answer example
        true,          // TrueFalse question answer example
        'log;;console' // FillBlanks question answer example
    ]
};
$.ajax({
    method: 'POST',
    url: '/api/profile/finishQuiz', // The endpoint we wish to post to
    data: results,
    dataType: 'json',               // Optional
    xhrFields: {
        withCredentials: true       // Include JWT token in our request
    }
}).then(function() {
    alert('Quiz results stored successfully!');
}).catch(function() {
    alert('Error while saving results!');
});