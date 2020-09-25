const express = require("express");
const bycrpt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

function generateToken(user) {
    // need 3 things to create a token: payload, secret, & options

    const payload = {
        id: user._id,
        email: user.email,
        // can add more non confidential data
    };

    const secret = "heE61FpVRwZ9YXynYeD8";

    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
}

// for all endpoints beginning with /api/users

router.post("/register", async (req, res) => {
    const credentials = req.body;
    
    if (!(credentials.email && credentials.password)) {
        return res.status(400).json({ message: "email and password required" });
    }
    
    credentials.hashedPass = bycrpt.hashSync(credentials.password, 12)
    credentials.isTeacher = (credentials.isTeacher === 'on') ? true : false;
    
    try {
        const users = await User.findOne({ email: credentials.email })
        if (users) {
            return res.status(400).json({ message: "Username already taken" });
        }
        console.table(credentials)
        await User.create(credentials)
        return res.redirect('/')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    const credentials = req.body;
    let cookie = req.session

    if (!(credentials.email && credentials.password)) {
        return res.status(400).json({ message: "Username and password required" });
    }
    
    credentials.isTeacher = (credentials.isTeacher === 'on') ? true : false;
    try{ 
        const user = await User.findOne({email : credentials.email})
        if (user && bycrpt.compareSync(credentials.password, user.hashedPass) && user.isTeacher == credentials.isTeacher) {
            const token = generateToken(user);
            req.session.user = {
                id: user._id,
                username: user.email
            };

            console.log("login successful")
            return res.redirect('/courses');
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get("/logout", async (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
})

module.exports = router;
