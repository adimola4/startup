const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.uid)

    return res.render('profile', {user})

    // return res.render('profile', user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while loading profile!', error })
  }
})

router.get('/AdminProfile', async (req, res) => {
  try {
    const user = await User.findById(req.user.uid)

    return res.render('AdminProfile', {user})

    // return res.render('profile', user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while loading profile!', error })
  }
})


router.get('/results', async (req, res) => {
  try {
    const user = await User.findById(req.user.uid).exec()
    return res.json({ message: 'Success', results: user.quizResults })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while saving quiz results!', error })
  }
})

router.post('/finishQuiz', async (req, res) => {
  const result = req.body

 // console.table(req.body)

  try {
    await User.findByIdAndUpdate(req.user.uid,
      { $push: { quizResults: result } }).exec()
    return res.json({ message: 'Quiz result saved!' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while saving quiz results!', error })
  }
})

router.get("/updateProfile", async (req, res) => {
  const user = await User.findById(req.user.uid)

  return res.render('updateProfile',{user})

});

router.get("/updatePassword", async (req, res) => {
  const user = await User.findById(req.user.uid)

  return res.render('updatePassword',{user})

});

router.get("/gradeHistory", async (req, res) => {
  const user = await User.findById(req.user.uid)
  return res.render('gradeHistory',{user})
});

router.get("/dashboard", async (req, res) => {
  const user = await User.findById(req.user.uid)
  return res.render('gradeHistory',{user})
});

router.post("/updateProfile", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.uid,req.body,
      {
      new : true,
      runValidators : true
      }
  );
  return res.redirect('/api/profile')
});

router.post('/changePassword', async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.uid).select('+password');

  // 3) If so, update password
  user.password = req.body.password;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

});


module.exports = router;

