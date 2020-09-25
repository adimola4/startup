const express = require("express");
const bycrpt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

const generateToken = (res, user) => {
    const secret = "heE61FpVRwZ9YXynYeD8"

    const expiration = 604800000;
    const token = jwt.sign({
        uid: user._id
    }, secret, {
        expiresIn: '7d',
    })
    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true only if https
        httpOnly: true,
    })
};

// for all endpoints beginning with /api/users

router.post("/register", async (req, res) => {
    const credentials = req.body;

    if (!(credentials.email && credentials.password)) {
        return res.status(400).json({ message: "email and password required" });
    }

    credentials.hashedPass = bycrpt.hashSync(credentials.password, 12)
    credentials.isTeacher = (credentials.isTeacher === 'on') ? true : false;

    try {
        const user = await User.findOne({ email: credentials.email })
        if (user) {
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
    try {
        const user = await User.findOne({ email: credentials.email })
        if (user && bycrpt.compareSync(credentials.password, user.hashedPass) && user.isTeacher == credentials.isTeacher) {
            console.log("login successful")
            await generateToken(res, user)
            return res.redirect('/api/courses');
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
