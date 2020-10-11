const app = require("./server");



app.get('/favicon.ico', (req, res) => res.status(404));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:page', (req, res) => {
    res.render(req.params.page)
})
app.listen(3000, function(){
    console.log("server listening on port 3000...")
})
