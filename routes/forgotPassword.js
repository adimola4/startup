const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const User = require("../models/user");


router.post('/', async (req, res, next) => {
  console.table(req.body);
  if (!req.body.email) res.render('/forgotPassword', { msg: "Please enter a valid email address" });

  // let token = "";

  // const setRandomToken = (token) =>
  // User.findOne({ email: req.body.email })
  //     .then((user) => {
  //      if (!user) {
  //        return res.render('forgotPassword',{msg:"Email Not exist"});
  //      } else {
  //         token=jwt.sign({
  //             uid: user._id
  //         }, secret, {
  //             expiresIn: '1h',
  //         })
  //       user.passwordResetToken = token;
  //       user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  //       user = user.save();
  //     }
  //     return user;
  //   });

  const user = await User.findOne({ email: req.body.email })

  console.table(user);

  if (!user) {
    console.log("!user")
    return;
  }

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
              http://${req.headers.host}/reset/\n\n
              If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };
  return transporter.sendMail(mailOptions)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      if (err.message === 'self signed certificate in certificate chain') {
        console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
      }
      console.log('ERROR: Could not send forgot password email after security downgrade.\n', err);
      return res.status(500).json(err);
      // return err;
    });
});
router.get('/reset/:token', async (req, res, next) => {
  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {

        return res.redirect(403, '/forgot');
      }
      res.render('reset', {
        title: 'שחזר סיסמא'
      });
    });
});


router.post('/reset/:token', async (req, res, next) => {
  if (!(req.body.password && req.body.confirm)) return res.render('reset', {
    title: 'שחזר סיסמא'
  });
  if (req.body.password !== req.body.confirm) {
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
        try {
          generateToken(res, user)
          res.render(user.isTeacher
            ? '/Quizes'
            : 'courses', user);
          resolve(user);
        } catch (err) {
          console.log(err);
          reject(err)
        }

      }));
    });
});


module.exports = router;
