// MongoDB
require('./mongodbConnModule').connect()

//express
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

const secret = "heE61FpVRwZ9YXynYeD8"

app.use(session({
    name: "cookie",
    secret,
    user: "user",
    cookie: {
        maxAge: 10 ** 10,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
}))

const verifyLogin = async (req, res, next) => {
    const token = req.cookies.token || ''
    if (!token) {
        return res.status(401).json('You need to Login')
    }
    try {
        const decrypt = await jwt.verify(token, secret);
        req.user = {
            uid: decrypt.uid
        }
        console.log('AUTHENTICATED !')
        console.table(req.user)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
};

//set Routers
app.use('/api/auth', require('./routes/auth'))
app.use('/api/courses', verifyLogin, require('./routes/courses'))
app.use('/api/users', verifyLogin, require('./routes/users'))
app.use('/api/profile', verifyLogin, require('./routes/profiles'))
app.use('/api/quiz', verifyLogin, require('./routes/quiz'))

app.use('/static', express.static('public'));

module.exports = app
