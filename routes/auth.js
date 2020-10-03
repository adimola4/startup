const express = require("express");
const bycrpt = require('bcryptjs')
const jwt = require("jsonwebtoken");



const User = require("../models/user");

const router = express.Router();
const secret = process.env.SECRET

const expiration = 7 * 24 * 60 * 60 * 1000; // 7d
const generateToken = (res, user) => {
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
}

// for all endpoints beginning with /api/auth

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

    if (!(credentials.email && credentials.password)) {
        return res.status(400).json({ message: "Username and password required" });
    }

    credentials.isTeacher = (credentials.isTeacher === 'on') ? true : false;
    try {
        const user = await User.findOne({ email: credentials.email })
        if (user &&
            bycrpt.compareSync(credentials.password, user.hashedPass) &&
            user.isTeacher == credentials.isTeacher) {
            console.log("[INFO] Login successful for email: " + user.email)
            await generateToken(res, user) // Include fresh JWT in response
           
            return res.render(credentials.isTeacher
                ? 'Quizes'
                : 'courses',user);
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get("/logout", async (req, res) => {
    // Destroy client's cookie
    res.cookie('token', '', { maxAge: 0 })
    return res.redirect('/')
})



module.exports = router;
