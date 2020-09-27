const container = $('#question');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const quizTitle = document.getElementById('quizTitle');

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function updateProgress() {
    // Update question number
    progressText.innerHTML = 'שאלה ' + (currentIndex + 1);
    // Calculate current percentage and update bar
    const percentage = (currentIndex / questions.length) * 100;
    progressBarFull.style.width = '' + percentage + '%';
}

var questions = currentIndex = answerAccepted = score = null;
const quizID = (() => {
    const rawId = getUrlVars()['id'];
    if (rawId.endsWith('#')) {
        return rawId.slice(0, -1);
    }
    return rawId;
})();

$(async () => {
    var resp = await fetch('/api/quiz/' + quizID);
    resp = await resp.json();
    // console.table(resp.quiz);
    questions = resp.quiz.questions;
    // Set quiz title
    quizTitle.innerHTML = resp.quiz.title;
    // Show first question
    enterQuestion(0);
});

function addScore() {
    score = (score || 0);
    score += (1 / questions.length) * 100;
    scoreText.innerText = Math.round(score);
}

function enterQuestion(index) {
    if (index === questions.length) {
        // Finish quiz!
        const data = {
            quizRef: quizID,
            grade: Math.round(score)
        };
        console.log(data);
        return fetch('/api/profile/finishQuiz', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(raw => {
            console.table(raw);
            raw.json().then(content => {
                console.log(content);
                alert(content.message);
                // if (status === 200)
                window.location.href = '/endQuiz?grade=' + data.grade;
            });
        });
    }
    currentIndex = index;
    const current = questions[currentIndex];

    // Update question container with new question's HTML
    // console.table(current);
    const choices = current.choices || [];
    container.html(templates[current.flavor](current.title, choices));

    // Assign onclick handler
    handlers[current.flavor](current.answer);

    // Update state
    updateProgress();
    answerAccepted = false;
}

const templates = {
    fillblanks: (title, choices) => {
        const genSpaces = (spaces) => { return '<span contenteditable="true" spellcheck="false" style="text-shadow: 0 0; color: #ddd; border-bottom: 2px solid #b7c0c7; background-color: #434d55; min-width: 20px !important; text-align: center;">' + ' '.repeat(spaces) + '</span>' };
        const genCode = (code) => { return '<code class="language-js" style="color: #d5d8df; text-shadow: 0 0">' + code + '</code>' };

        // var html = '<p style="font-size: 1.2em; text-align: right;">' +
        //     title + '</p>';
        var html = '<pre class="language-js" style="text-align: left; background: #353535; margin: 15px 0;" dir="ltr">';
        for (const choice of choices) {
            console.table(choice);
            const type = choice[0],
                data = choice[1];
            if (type === 'space') {
                html += genSpaces(data);
            } else if (type === 'code') {
                html += genCode(data);
            }
        }
        html += '</pre><a class="boxed-btn4" id="color-btn" href="#" style="float: right;">אשר   </a>';
        return html;
    },
    american: (title, choices) => {
        var html = '<h2 dir="rtl" style="text-align: right;">' +
            title + '</h2>';
        for (let i = 0; i < choices.length; i++) {
            html += '<div class="choice-container" data-answer="' +
                i + '"><p class="choice-prefix">' +
                (i + 1) + '</p><p class="choice-text">' +
                choices[i] + '</p></div>';
        }
        return html;
    },
    truefalse: (title, choices) => {
        return '<pre style="text-align: left;" dir="ltr"><code class="language-js">' +
            title + '</code></pre><div style="margin-bottom: 6em; margin-top: 1.65em ;"><div class="choice-container" data-answer="0" style="width: 10%;  display:inline-block;"><p class="choice-text" style="padding: 18px 24px; margin-bottom: 0; width: 100%; text-align: center; ">False</p></div><div class="choice-container" data-answer="1" style="width: 10%;  display:inline-block;  margin-right: 0.5%;"><p class="choice-text" style="padding: 18px 24px; margin-bottom: 0; width: 100%; text-align: center;">True</p></div></div>';
    }
};

const handlers = {
    fillblanks: (trueAnswer) => {
        container.find('span[contenteditable="true"]').click(function () {
            $(this).text('');
        });
        container.find('a.boxed-btn4').click(async function () {
            if (answerAccepted) return;
            answerAccepted = true;

            var answered = [];
            const pre = container.find('pre');
            await pre.children('span[contenteditable="true"]').each((i, e) => {
                answered.push($(e).text());
            });
            answered = answered.join(';;');

            const answerTrue = trueAnswer === answered;
            if (answerTrue) {
                addScore();
            }
            $(this).text(answerTrue ? 'correct' : 'incorrect');

            setTimeout(() => {
                // move to next question
                enterQuestion(currentIndex + 1);
            }, 1000);
        });
    },
    american: (trueAnswer) => {
        container.find('.choice-container').click(function () {
            if (answerAccepted) return;
            answerAccepted = true;

            const cContainer = $(this);

            const answerTrue = parseInt(trueAnswer) === parseInt(cContainer.data('answer'));
            if (answerTrue) {
                addScore();
            }
            cContainer.addClass(answerTrue ? 'correct' : 'incorrect');

            setTimeout(() => {
                // move to next question
                enterQuestion(currentIndex + 1);
            }, 1000);
        });
    },
    truefalse: (trueAnswer) => {
        container.find('p.choice-text').click(function () {
            if (answerAccepted) return;
            answerAccepted = true;

            const cContainer = $(this).parent();

            const answered = (!!cContainer.data('answer')).toString();
            const answerTrue = trueAnswer === answered;
            if (answerTrue) {
                addScore();
            }
            cContainer.addClass(answerTrue ? 'correct' : 'incorrect');

            setTimeout(() => {
                // move to next question
                enterQuestion(currentIndex + 1);
            }, 1000);
        });
    }
}
