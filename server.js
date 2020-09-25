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

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

app.use(session({
    name: "cookie",
    secret: "heE61FpVRwZ9YXynYeD8",
    user: "user",
    cookie: {
        maxAge: 10 ** 10,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
}))

const restricted = (req, res, next) => {
    //const token = req.headers.authorization;
    // const secret = "heE61FpVRwZ9YXynYeD8"
    const cookie = req.session

    if (cookie && cookie.user) {
        next();
    }

    // if (token) {
    //   jwt.verify(token, secret, (err, decodedToken) => {
    //     if (err) {
    //       res.status(401).json({ message: "Invalid token received" });
    //     } else {
    //       req.decodedToken = decodedToken;
    //       next();
    //     }
    //   });
    else {
        res.status(401).json({ message: "No token received" });
    }
};

//set Routers
app.use('/api/auth', require('./routes/auth'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/users', restricted, require('./routes/users'))
app.use('/api/profile', require('./routes/profiles'))
app.use('/api/quiz', require('./routes/quiz'))

app.use('/static', express.static('public'));

module.exports = app
