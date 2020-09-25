//express
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');

const sessionConfig = {
    name : "cookie" , 
    secret : "heE61FpVRwZ9YXynYeD8",
    user : "user" ,
    cookie : {
        maxAge : 10 ** 10,
        secure : false,
        httpOnly : true
    },
    resave: false,
    saveUninitialized: true,
}


const restricted = require('../auth/restricted-middleware')

//set Routers
const authRouter = require('../auth/auth-routes')
const usersRouter = require('../Routes/users-routes')
const coursesRouter = require('../Routes/courses-routes')
const profileRouter = require('../Routes/profile-routes')
const questionRouter = require('../Routes/question-routes')

app.use(bodyParser.urlencoded({extended : false}))

app.use(session(sessionConfig))
// link routers
app.use('/api/auth', authRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/users', restricted, usersRouter)
app.use('/api/profile', profileRouter)
app.use('/api/question', questionRouter)

app.use('/static', express.static('public'));


app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

module.exports = app
