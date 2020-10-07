const express = require("express");
const User = require("../models/user");
const Contact = require("../models/contact");
const router = express.Router();

// for all endpoints starting with /api/dashboard/

router.get('/', async (req, res) => {
    // const users = await User.find({address: עפולה});
    // users = await users.populate('quizResults.quizRef').execPopulate()

    const Queries = {
        totalMales : await User.find({ gender: 'male' }).countDocuments(),
        totalFemales : await User.find({ gender: 'female' }).countDocuments(),
        totalUsers : await User.find().countDocuments(),
        contactCounter : await Contact.find().countDocuments(),
        users : await User.find(),
        userPerMonth : await User.aggregate( [{
              $group: {
                 _id: { $month: "$joinDate" },
                 count: { $sum: 1 }
              }
            }
          ] ) ,

    }

    res.json(Queries);
})


module.exports = router;
