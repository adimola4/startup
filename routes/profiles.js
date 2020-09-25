const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('profile');
});

// router.get('/', async (req, res) => {
//   console.log({ newCookie: req.session })
//   console.log("********************")

//   const user = await User.findUserByEmail(req.params.email)
//   user.fullName = user.firstName + " " + user.lastName

//   return res.render('profile', user)
// })

// router.get('/finishQuiz', async (req, res) => {
//   console.log({ newCookie: req.session })
//   console.log("********************")

//   const user = await User.findUserByEmail(req.params.email)
//   user.fullName = user.firstName + " " + user.lastName

//   return res.render('profile', user)
// })

module.exports = router;
