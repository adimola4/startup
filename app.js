const app = require("./server");
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');

});
app.get('/Quizes', (req, res) => {
    res.render('Quizes')
})
app.get('/Quiz', (req, res) => {
    res.render('Quiz')
})
app.get('/AddNewQuiz', (req, res) => {
    res.render('AddNewQuiz')
})
app.get('/404', (req, res) => {
    res.render('404')
})

app.get('/Dashboard', (req, res) => {
    res.render('Dashboard')
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
