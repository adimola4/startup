// MongoDB
require('./mongodbConnModule').connect()

// Express and middleware
const express = require('express')
const app = express()
const path = require("path")



app.use(express.json())
app.use(require('body-parser').urlencoded({ extended: false }))
app.use(require('cookie-parser')())
app.use(require('helmet')())
app.use(require('morgan')('dev'))
app.use(require('cors')())


app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'))
app.use('/static', express.static(path.join(__dirname,'public')));

app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
});

// Load secret key from env file
require('dotenv').config()
const secret = process.env.SECRET

const jwt = require('jsonwebtoken')
const verifyLogin = async (req, res, next) => {
    // Attempt to parse token from the incoming request
    const token = req.cookies.token || ''
    if (!token) {
        return res.status(401).json('You need to Login')
    }
    try {
        // Decrypt the token
        const decrypt = await jwt.verify(token, secret);
        // Attach our requesting User to the passing 'req' object
        //      so we will be able to determine inside API endpoints
        //      which user is currently logged in
        req.user = {
            uid: decrypt.uid
        }
        // console.log('[DEBUG] User authenticated!')
        // console.table(req.user)
        return next()
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
};

//set Routers
app.use('/api/auth', require('./routes/auth')) // Public routes
app.use('/api/contact', require('./routes/contact'))// Public routes
app.use('/api/forgotPassword', require('./routes/forgotPassword'))
app.use('/api/courses', verifyLogin, require('./routes/courses'))
app.use('/api/users', verifyLogin, require('./routes/users'))
app.use('/api/profile', verifyLogin, require('./routes/profiles'))
app.use('/api/AdminProfile', verifyLogin, require('./routes/profiles'))
app.use('/api/updateProfile', verifyLogin, require('./routes/profiles'))
app.use('/api/updatePassword', verifyLogin, require('./routes/profiles'))
app.use('/api/gradeHistory', verifyLogin, require('./routes/profiles'))
app.use('/api/quiz', verifyLogin, require('./routes/quiz'))
app.use('/api/dashboard', verifyLogin, require('./routes/dashboard'))




module.exports = app
