const table = $('#quizzesTable');
const title = $('#titleLabel');

function appendQuizEntryToTable(quiz) {
    var html = '<tr data-id="' + quiz._id + '"><td></td><td><a href="/quiz?id=' +
        quiz._id + '">' + quiz.title + '</a></td></tr>';
    table.append(html);
}

async function loadQuizes() {
    // Fetch all quizes
    var resp = await fetch('/api/quiz/');
    resp = await resp.json();
    // console.log(resp);

    // Show them
    for (const quiz of resp) {
        appendQuizEntryToTable(quiz);
    }

    // Sync load bootstrap's table JS 
    await $.getScript("https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js");
    title.text('שאלונים');
}

function deleteItem() {
    table.children('.selected').each((i, e) => {
        const qid = $(e).data('id');
        fetch('/api/quiz/' + qid, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async (raw) => {
            if (raw.status === 200) {
                $(e).remove();
            } else {
                const content = await raw.json();
                console.error(content);
            }
        });
    });
}

$(() => {
    loadQuizes();
})