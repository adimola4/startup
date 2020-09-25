const app = require("./server");
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');

});
app.get('/Quiz', (req, res) => {
    res.render('Quizes')
})
app.get('/AddNewQuiz', (req, res) => {
    res.render('AddNewQuiz')
})
app.get('/courses', (req, res) => {
    res.render('courses')
})

app.get('/EndQuiz', (req, res) => {
 
    res.render('endQuiz');

});

app.get('/MultipleChoice', (req, res) => {
 
    res.render('multipleChoice');

});

app.get('/TrueOrFalse', (req, res) => {
 
    res.render('trueOrFalse');

});

app.get('/FillBlanks', (req, res) => {
 
    res.render('fillBlanks');

});

app.get('/singleCourse', (req, res) => {

    res.render('course-single');

});

app.get('/signIn', (req, res) => {

    res.render('signIn');

});

app.get('/signUp', (req, res) => {

    res.render('signUp');

});

app.get('/forgetPassword', (req, res) => {

    res.render('forgetPassword');

});

app.listen(3000, function(){
    console.log("server listening on port 3000...")

})