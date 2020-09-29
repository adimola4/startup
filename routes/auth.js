const express = require("express");
const bycrpt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const fs = require('fs');
const SMTPServer = require("smtp-server").SMTPServer;


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
                ? '/Quizes'
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

router.post('/forgot', async (req,res,next)=>{
    if(!req.body.email) res.render('forgetPassword',{msg:"Please enter a valid email address"});
    
    
    let token = "";

    const setRandomToken = (token) =>
    User.findOne({ email: req.body.email })
        .then((user) => {
         if (!user) {
           return res.render('/forgetPassword',{msg:"Email Not exist"});
         } else {
            token=jwt.sign({
                uid: user._id
            }, secret, {
                expiresIn: '1h',
            })

          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user = user.save();
        }
        return user;
      });

    const sendForgotPasswordEmail = (user) => {
        if (!user) { return; }
        const token = user.passwordResetToken;
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.SITE_CONTACT_EMAIL,
            pass: process.env.SITE_CONTACT_PASS
          }
        });
        const mailOptions = {
            to: user.email,
            from: 'Connect.codern@gmail.com',
            subject: 'שחזר סיסמא',
            text: `קיבלת מייל זה בעקבות בקשתך לשנות סיסמא\n\n
              הקלק על הלינק מתחת והשלם את התהליך\n\n
              http://${req.headers.host}/reset/${token}\n\n
              If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };
          return transporter.sendMail(mailOptions)
            .then(() => {
              req.redirect('/');
            })
            .catch((err) => {
              if (err.message === 'self signed certificate in certificate chain') {
                console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
                transporter = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                    user: process.env.SITE_CONTACT_EMAIL,
                    pass: process.env.SITE_CONTACT_PASS
                  },
                  tls: {
                    rejectUnauthorized: false
                  }
                });
                return transporter.sendMail(mailOptions)
                  .then(() => {
                    res.redirect('/');
                  });
              }
              console.log('ERROR: Could not send forgot password email after security downgrade.\n', err);
              res.send(err)
              return err;
            });
        };
        setRandomToken(token).then(sendForgotPasswordEmail)
        .then(res.redirect('/forgot')).catch(next);
});
router.get('/reset/:token', async(req, res, next)=>{
    User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        
        return res.redirect(403,'/forgot');
      }
      res.render('reset', {
        title: 'שחזר סיסמא'
      });
    });
});


router.post('/reset/:token',async(req, res, next )=>{
    if(!(req.body.password && req.body.confirm))return res.render('reset', {
        title: 'שחזר סיסמא'
      });
    if (req.body.password !== req.body.confirm){
        return res.render('reset', {
            title: 'שחזר סיסמא'
          });
    }
   
    User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .then((user) => {
      if (!user) {
        return res.redirect('back');
      }
      user.password = req.body.password;
      user.passwordResetToken = "";
      user.passwordResetExpires = "";
      return user.save().then(() => new Promise((resolve, reject) => {
        try{
              generateToken(res, user)
             res.render(user.isTeacher
                ? '/Quizes'
                : 'courses',user);
                resolve(user);
        }catch(err){
            console.log(err);
            reject(err)
        }
      
      }));
    });
});


module.exports = router;
