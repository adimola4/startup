const table = $('.learningSection');


var currentIndex = 0;
function appendQuizEntryToTable(quiz, currentIndex) {
    let html = '<div class="row bg-light align-items-center p-4 episode">'
            +     '<div class="col-md-2 text-center">'
            +           '<a href="/quiz?id=' + quiz._id + '"">'
            +               '<span><i class="fas fa-chevron-circle-left purple-play-btn"></i></span></a></div>'
            +  '<div class="col-md-10" dir="rtl">' 
            +  '<p class="meta">שאלון '+ currentIndex +' </p>'
            +  '<h2><a href="#"></a>' + quiz.title + '</h2>'
            +  '</div></div>'; 


    table.append(html);


}

async function loadQuizes() {
    
    // Fetch all quizes
    var resp = await fetch('/api/quiz/');
    resp = await resp.json();
    // console.log(resp);

    // Show them
    for (const quiz of resp) {
        currentIndex += 1;
        appendQuizEntryToTable(quiz,currentIndex);
    }

    // Sync load bootstrap's table JS 
    await $.getScript("https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js");
    // title.text('שאלונים');
}

$(() => {
    loadQuizes();
})