
function setGreen(element) {
    const container = $(element).parents('div').first();
    let trueElement = container.children().last().children().last();
    let falselement = container.children().first().children().last();

    trueElement.removeClass('hover:text-green-600');
    trueElement.removeClass('hover:bg-green-100');
    trueElement.removeClass('bg-white');
    trueElement.removeClass('text-grey-700');

    falselement.removeClass('hover:bg-red-600');
    falselement.removeClass('text-white');
    falselement.removeClass('bg-red-500');
    falselement.removeClass('truefalse-selected');

    falselement.addClass('text-grey-700');
    falselement.addClass('bg-white');
    falselement.addClass('hover:text-red-600');
    falselement.addClass('hover:bg-red-100');

    trueElement.addClass('hover:bg-green-600');
    trueElement.addClass('bg-green-500');
    trueElement.addClass('text-white');
    trueElement.addClass('truefalse-selected');
}

function setRed(element) {
    const container = $(element).parents('div').first();
    let trueElement = container.children().last().children().last();
    let falselement = container.children().first().children().last();

    trueElement.removeClass('hover:bg-green-600');
    trueElement.removeClass('bg-green-500');
    trueElement.removeClass('text-white');
    trueElement.removeClass('truefalse-selected');

    trueElement.addClass('hover:text-green-600');
    trueElement.addClass('hover:bg-green-100');
    trueElement.addClass('bg-white');
    trueElement.addClass('text-grey-700');

    falselement.removeClass('text-grey-700');
    falselement.removeClass('bg-white');
    falselement.removeClass('hover:text-red-600');
    falselement.removeClass('hover:bg-red-100');

    falselement.addClass('hover:bg-red-600');
    falselement.addClass('text-white');
    falselement.addClass('bg-red-500');
    falselement.addClass('truefalse-selected');
}

function checkedButton(element) {
    // Remove all green classes
    const container = $(element).parents('div.container').first();
    container.children().each((i, e) => {
        $(e).children().removeClass('textGreen');
        $(e).children('input[type="radio"]').removeClass('green');
    });

    // Add green classes only to clicked element
    const legend = $(element).parent();
    $(legend).children().addClass('textGreen');
    $(legend).children('input[type="radio"]').addClass('green');
}

function disabled() {
    // let texteria = document.getElementById("bio");
    // if (texteria.value.length != 0) {

    //     texteria.disabled = true;
    //     let flaseElement = document.getElementById("false");
    //     flaseElement.style.pointerEvents = 'none';

    //     let trueElement = document.getElementById("true");
    //     trueElement.style.pointerEvents = 'none';


    //     document.querySelector(".trueFalseQ").classList.remove('bg-grey-50');

    //     let green = document.getElementsByClassName('bg-green-500');
    //     let red = document.getElementsByClassName('bg-red-500');

    //     if (red.length == 1) {
    //         trueElement.style.display = 'none';
    //     } else { flaseElement.style.display = 'none'; }

    //     // console.log(red.length)
    //     // console.log(green.length)
    // }
}

function deleteQ(element) {
    $(element).parents('.section-top-border').first().remove();
}

const templates = {
    truefalse: (index) => '<div data-flavor="truefalse" class="section-top-border aquest bg-grey-50 width" style="margin: 0 auto; border-radius: 1em;" dir="rtl"><div class="container" style="margin-top: 0;"><div class="btn" aria-label="Save Question" type="button" style="float:left; margin-left: 20px; padding: 0 12px"><div class="relative flex items-center justify-center p-2" style="background-color: #0099c7; border-radius: 0.5em;"><svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" focusable="false" aria-hidden="true"> <path fill-rule="nonzero" d="M18.293 6.293a1 1 0 011.497 1.32l-.083.094-10 10a1 1 0 01-1.32.083l-.094-.083-5.5-5.5a1 1 0 011.32-1.497l.094.083L9 15.585l9.293-9.292z"></path></svg></div></div><div style=" margin-left: 30px;"><div class="btn" aria-label="Delete Question" type="button" onclick="deleteQ(this)"><div class="relative p-0 m-0 border-0 rounded-2 appearance-none outline-none transition ease-in-out duration-100 icon-button cursor-pointer text-cyan-600 bg-transparent"> <svg viewBox="0 0 24 24" width="24" height="24" fill="#0099c7" focusable="false" aria-hidden="true"><path fill-rule="nonzero" d="M14.5 4a.5.5 0 00-.41-.492L14 3.5h-4a.5.5 0 00-.492.41L9.5 4v1H8V4a2 2 0 012-2h4a2 2 0 012 2v1h4.5a.75.75 0 01.102 1.493L20.5 6.5H19V19a2 2 0 01-2 2H7a2 2 0 01-2-2V6.5H3.5a.75.75 0 01-.102-1.493L3.5 5h11V4zm3 2.5h-11V19a.5.5 0 00.41.492L7 19.5h10a.5.5 0 00.492-.41L17.5 19V6.5zM9 8.25a.75.75 0 01.743.648L9.75 9v8a.75.75 0 01-1.493.102L8.25 17V9A.75.75 0 019 8.25zm3 0a.75.75 0 01.743.648L12.75 9v8a.75.75 0 01-1.493.102L11.25 17V9a.75.75 0 01.75-.75zm3 0a.75.75 0 01.743.648L15.75 9v8a.75.75 0 01-1.493.102L14.25 17V9a.75.75 0 01.75-.75z"></path></svg></div></div></div><div style="width: 80%; margin-right: 20px;"> <span class="text-md text-blue-900" style="float: right;">' + index + '.<textarea class="rounded-2" name="biography" id="bio" placeholder="הוסף שאלת נכון או לא נכון" dir="ltr" style="float:right; margin:0 15px; margin-bottom: 25px;"></textarea></span></div><br/><br/><br/><br/><br/><div class="col-span-2 col-start-2 flex items-start pl-2" id="disableTrueFalse" style="margin-right: 50px;"><label class="rounded-2 cursor-pointer truefalse-option"><input class="sr-only" type="radio" name="trueOrFalse" value="false"/><span class="truefalse-selected flex flex-1 items-center justify-center px-8 py-2 rounded-2 font-sans text-base leading-8 transition ease-in-out duration-100 bg-red-500 text-white hover:bg-red-600" data-truefalse="false" onclick="setRed(this)">False</span></label><label class="mr-4 rounded-2 cursor-pointer truefalse-option"><input class="sr-only" type="radio" name="trueOrFalse" value="true" checked="" /><span class="flex flex-1 items-center justify-center px-8 py-2 rounded-2 font-sans text-base leading-8 transition ease-in-out duration-100 font-600 bg-white text-grey-700 hover:text-green-600 hover:bg-green-100 " data-truefalse="true" onclick="setGreen(this)">True</span></label></div><br></div></div>'
    , american: (index) => '<div data-flavor="american" class="section-top-border aquest bg-grey-50 width" style="margin: 0 auto; border-radius: 1em;" dir="rtl"><div class="container" style="margin-top: 0;"><div class="btn" aria-label="Save Question" type="button" style="float:left; margin-left: 20px; padding: 0 12px"><div class="relative flex items-center justify-center p-2" style="background-color: #0099c7; border-radius: 0.5em;"><svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" focusable="false" aria-hidden="true"> <path fill-rule="nonzero" d="M18.293 6.293a1 1 0 011.497 1.32l-.083.094-10 10a1 1 0 01-1.32.083l-.094-.083-5.5-5.5a1 1 0 011.32-1.497l.094.083L9 15.585l9.293-9.292z"></path></svg></div></div><div style="width: 80%; margin-right: 20px;"> <span class="text-md text-blue-900" style="float: right;">' + index + '.</span><input type="text" class="american-title" style="float:right; margin:0 15px; margin-bottom: 25px;" placeholder="רשום כאן את השאלה" /></div><div style="margin-top: 15px; margin-left: 30px;"><div class="btn" aria-label="Delete Question" type="button" onclick="deleteQ(this)"><div class="relative p-0 m-0 border-0 rounded-2 appearance-none outline-none transition ease-in-out duration-100 icon-button cursor-pointer text-cyan-600 bg-transparent"> <svg viewBox="0 0 24 24" width="24" height="24" fill="#0099c7" focusable="false" aria-hidden="true"><path fill-rule="nonzero" d="M14.5 4a.5.5 0 00-.41-.492L14 3.5h-4a.5.5 0 00-.492.41L9.5 4v1H8V4a2 2 0 012-2h4a2 2 0 012 2v1h4.5a.75.75 0 01.102 1.493L20.5 6.5H19V19a2 2 0 01-2 2H7a2 2 0 01-2-2V6.5H3.5a.75.75 0 01-.102-1.493L3.5 5h11V4zm3 2.5h-11V19a.5.5 0 00.41.492L7 19.5h10a.5.5 0 00.492-.41L17.5 19V6.5zM9 8.25a.75.75 0 01.743.648L9.75 9v8a.75.75 0 01-1.493.102L8.25 17V9A.75.75 0 019 8.25zm3 0a.75.75 0 01.743.648L12.75 9v8a.75.75 0 01-1.493.102L11.25 17V9a.75.75 0 01.75-.75zm3 0a.75.75 0 01.743.648L15.75 9v8a.75.75 0 01-1.493.102L14.25 17V9a.75.75 0 01.75-.75z"></path></svg></div></div></div></div><div class="container"><legend><span class="number">A</span><input type="radio" name="rightChoice" onclick="checkedButton(this)" /><input class="rounded-2" type="text" placeholder="תשובה א" /></legend><legend><span class="number">B </span><input type="radio" name="rightChoice" onclick="checkedButton(this)" /><input class="rounded-2" type="text" placeholder="תשובה ב" /></legend><legend><span class="number">C </span><input type="radio" name="rightChoice" onclick="checkedButton(this)" /><input class="rounded-2" type="text" placeholder="תשובה ג" /></legend><legend><span class="number">D</span><input type="radio" name="rightChoice" onclick="checkedButton(this)" /><input class="rounded-2" type="text" placeholder="תשובה ד" /></legend></div></div>'
    , fillblanks: (index) => '<div data-flavor="fillblanks" class="section-top-border aquest bg-grey-50 width" style="margin: 0 auto; border-radius: 1em;" dir="rtl"><div class="container" style="margin-top: 0;"></div><p dir="rtl" style="font-size: 0.9em; float: right; margin-right: 20px;">רשום את השאלה והדגש באמצעות הכפתור את המילים אשר ברצונך שממלאי השאלון ישלימו.</p><div class="btn" aria-label="Save Question" type="button" style="float:left; margin-left: 20px; padding: 0 12px"><div class="relative flex items-center justify-center p-2" style="background-color: #0099c7; border-radius: 0.5em;"><svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" focusable="false" aria-hidden="true"> <path fill-rule="nonzero" d="M18.293 6.293a1 1 0 011.497 1.32l-.083.094-10 10a1 1 0 01-1.32.083l-.094-.083-5.5-5.5a1 1 0 011.32-1.497l.094.083L9 15.585l9.293-9.292z"></path></svg></div></div><div style=" margin-left: 30px;"><div class="btn" aria-label="Delete Question" type="button" onclick="deleteQ(this)"><div class="relative p-0 m-0 border-0 rounded-2 appearance-none outline-none transition ease-in-out duration-100 icon-button cursor-pointer text-cyan-600 bg-transparent"> <svg viewBox="0 0 24 24" width="24" height="24" fill="#0099c7" focusable="false" aria-hidden="true"><path fill-rule="nonzero" d="M14.5 4a.5.5 0 00-.41-.492L14 3.5h-4a.5.5 0 00-.492.41L9.5 4v1H8V4a2 2 0 012-2h4a2 2 0 012 2v1h4.5a.75.75 0 01.102 1.493L20.5 6.5H19V19a2 2 0 01-2 2H7a2 2 0 01-2-2V6.5H3.5a.75.75 0 01-.102-1.493L3.5 5h11V4zm3 2.5h-11V19a.5.5 0 00.41.492L7 19.5h10a.5.5 0 00.492-.41L17.5 19V6.5zM9 8.25a.75.75 0 01.743.648L9.75 9v8a.75.75 0 01-1.493.102L8.25 17V9A.75.75 0 019 8.25zm3 0a.75.75 0 01.743.648L12.75 9v8a.75.75 0 01-1.493.102L11.25 17V9a.75.75 0 01.75-.75zm3 0a.75.75 0 01.743.648L15.75 9v8a.75.75 0 01-1.493.102L14.25 17V9a.75.75 0 01.75-.75z"></path></svg></div></div></div><br/><div style="width: 80%; margin-right: 20px; min-height: 150px;"><span class="text-md text-blue-900" style="float: right;">' + index + '.</span><div class="fillblanks-input rounded-2" contenteditable="true" name="fillTheBlanks" dir="ltr" style="box-shadow: 1px 3px 0 rgba(0,0,0,0.03) inset; float:right; margin:0 15px; margin-bottom: 25px; min-height: 150px; min-width: 600px; background-color: #f3f3f3; padding: 10px;">רשום כאן את השאלה..</div></div><br/><button class="btn rounded-2" onclick="document.execCommand(\'bold\')" style="float:right; margin-right: 50px; background: #fab1a0;color: white; border: 1px solid #fab1a0;">הדגש</button></div>'
}
var currentIndex = 0;
function addQuestion(flavor) {
    currentIndex += 1;
    $('#controlBlock').after(templates[flavor](currentIndex));
}

async function saveQuiz() {
    const quiz = { questions: [] };
    // Collect data and verify integrity
    quiz.title = $('textarea.editable-title__input').val();
    if (!quiz.title) {
        return alert('נא להזין שם לשאון!');
    }

    var valid = true;
    const questions = $('.section-top-border.aquest');
    if (questions.length === 0) {
        return;
    }
    await questions.each(async (i, e) => {
        e = $(e);
        const flavor = e.data('flavor');
        const question = { flavor };
        if (flavor === 'truefalse') {
            // title
            question.title = e.find('textarea.rounded-2').val();
            if (!question.title) {
                valid = false;
                return;
            }
            // active btn to answer
            question.answer = e.find('span.truefalse-selected').data('truefalse').toString();
            if (!question.answer) {
                valid = false;
                return;
            }
        } else if (flavor === 'american') {
            // title
            question.title = e.find('input.american-title').val();
            if (!question.title) {
                valid = false;
                return;
            }
            // choices and green radio
            question.choices = [];
            await e.find('input.rounded-2').each((i, e) => {
                const choice = $(e).val();
                if (!choice) {
                    valid = false;
                    return;
                }
                question.choices.push(choice);
                if ($(e).prev().hasClass('green')) {
                    question.answer = i;
                };
            });
            if (question.answer === undefined) {
                valid = false;
                return;
            }
        } else if (flavor === 'fillblanks') {
            question.choices = [];
            const answers = [];

            const data = e.find('div.fillblanks-input');
            if (data.children('div').length > 0) {
                var carry = null;

                await data.children('div').each(async (i, e) => {
                    var line = '';
                    if (carry) {
                        line += carry + '\r\n';
                    }
                    line += $(e).html();
                    while (-1 !== line.indexOf('<b>')) {
                        var pts = line.split('<b>');
                        var code = pts.shift();
                        question.choices.push(['code', code]);
                        line = pts.join('<b>');

                        var pts = line.split('</b>')
                        var ans = pts.shift();
                        answers.push(ans);
                        question.choices.push(['space', ans.length]);
                        line = pts.join('</b>');
                    }
                    carry = line;
                });
                question.choices.push(['code', carry]);
            } else {
                { // INITIAL & BUGGY ALGORITHM
                    // var text = '';
                    // await data.children('b').each((i, e) => {
                    //     answers.push($(e).text());
                    // });
                    // text = data.text();
                    // console.log(answers);
                    // for (const ans of answers) {
                    //     const pts = text.split(ans);
                    //     console.table({ text, ans, pts });
                    //     if (pts[0]) {
                    //         question.choices.push(['code', pts[0]]);
                    //     }
                    //     question.choices.push(['space', ans.length]);
                    //     text = pts[1];
                    // }
                    // question.choices.push(['code', text]);
                }

                var line = $(e).html();
                while (-1 !== line.indexOf('<b>')) {
                    var pts = line.split('<b>');
                    var code = pts.shift();
                    question.choices.push(['code', code]);
                    line = pts.join('<b>');

                    var pts = line.split('</b>')
                    var ans = pts.shift();
                    answers.push(ans);
                    question.choices.push(['space', ans.length]);
                    line = pts.join('</b>');
                }
                question.choices.push(['code', line]);
            }
            question.answer = answers.join(';;');
        }
        quiz.questions.push(question);
    });

    // console.table(quiz);
    if (!valid) return;

    (async () => {
        const rawResponse = await fetch('/api/quiz/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });
        const content = await rawResponse.json();
        console.log(content);
        alert(content.message);
        window.location.href = '/quizes';
    })();
}
