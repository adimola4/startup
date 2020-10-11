const express = require("express");
const Course = require("../models/course");
const User = require("../models/user")

const router = express.Router();

// for all endpoints starting with /api/singleCourse/

router.get('/', async (req, res) => {
// console.log('[DBG] Authenticated as:')
  try{
    let user =  await User.findById(req.user.uid);
    return res.render('courses', { subject, title ,user});
  }catch(err){
    console.log(err);
    return res.render('singleCourse');
  }
});


module.exports = router;
