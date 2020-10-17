const app = require("./server");
const jwt = require('jsonwebtoken')


const User = require("./models/user");


app.get('/favicon.ico', (req, res) => res.status(404));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signIn',async (req, res) => {
    res.render('./signIn')

});

app.get('/signUp',async (req, res) => {
    res.render('./signUp')

});

app.get('/forgotPassword',async (req, res) => {
    res.render('./forgotPassword')

});

app.get('/:page',async (req, res) => {
// Attempt to parse token from the incoming request
const token = req.cookies.token || ''
if (!token) {
    return res.status(401).json('You need to Login')
}
try {
    // Decrypt the token
    const decrypt = await jwt.verify(token, process.env.SECRET);
    // Attach our requesting User to the passing 'req' object
    //      so we will be able to determine inside API endpoints
    //      which user is currently logged in
    req.user = {
        uid: decrypt.uid
    }
    console.log('[DEBUG] User authenticated!')
    console.table(req.user)
    // return next()
    const user = await User.findById(req.user.uid)
    res.render(req.params.page,{user})
} catch (err) {
    console.log(err)
    return res.status(500).json(err)
}

    
})
app.listen(3000, function(){
    console.log("server listening on port 3000...")
})
