const express = require("express");
const User = require("../models/user");
const router = express.Router();

// for all endpoints starting with /api/dashboard/

router.get('/', async (req, res) => {
    const Queries = {
        totalMales : await User.find({ gender: 'male' }).countDocuments(),
        totalFemales : await User.find({ gender: 'female' }).countDocuments(),
        
        totalUsers : await User.find().countDocuments(),
        


        //  maxPoints : await User.find().sort({ points: -1 }).limit(5),

        //  answerHard : await User.find().sort({ points: -1 }).limit(5),

        //  userPerMonth = await User.aggregate()([{
        //       $group: {
        //          _id: "$joinDate.month",
        //          count: { $sum: 1 }
        //       }
        //     },
        // ])



    }

    console.log(Queries)
    res.json(Queries);
})

// const getGender =  () => {

    
   
//     return male
   
// };


module.exports = router;
