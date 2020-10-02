const express = require("express");
const User = require("../models/user");
const router = express.Router();

// for all endpoints starting with /api/dashboard/

router.get('/', async (req, res) => {
    const users = {
        totalMales : await User.find({ gender: 'male' }).countDocuments(),
        totalFemales : await User.find({ gender: 'female' }).countDocuments(),
        totalUsers : await User.find().countDocuments()
    }
    console.log(users)
    res.render('dashboard', {users});
})

// const getGender =  () => {

    
   
//     return male
   
// };


module.exports = router;
