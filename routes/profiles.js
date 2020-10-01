const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.uid)

    // if gender == "female"
    // - var randomNumber = Math.floor(Math.random() * 2);
    //  if randomNumber == 0 
    //     randomNumber = 3; 
    //  else 
    //     randomNumber = 8;
    
    let randomNumber;
    if (user.gender == "female"){
      randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber == 0) 
          randomNumber = 3; 
        else 
          randomNumber = 8;
    }
    else {
    randomNumber = Math.floor(Math.random() * 9);
      while (randomNumber == 3 || randomNumber == 8)
        randomNumber = Math.floor(Math.random() * 9);
    }

    return res.render('profile', {user, randomNumber})
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
  console.table(req.body)

  try {
    await User.findByIdAndUpdate(req.user.uid,
      { $push: { quizResults: result } }).exec()
    return res.json({ message: 'Quiz result saved!' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while saving quiz results!', error })
  }
})

module.exports = router;
