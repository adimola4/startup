const app = require("./server");
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:page', (req, res) => {
    res.render(req.params.page)
})

app.listen(3000, function(){
    console.log("server listening on port 3000...")
})
