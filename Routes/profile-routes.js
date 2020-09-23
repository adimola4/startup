const express = require("express");
const user = require("../models/dbHelpers");

const router = express.Router();

router.get('/', (req, res) => {
    res.render('profile');
  
  });

  router.get('/', (req, res) => {
    console
console.log({newCookie: req.session }   )
    const { email } = req.params;

    console.log("********************")

    console.log(user.findUserByEmail(email).then(user =>{
        
   
    const title = user.Title
    const address = user.Address
    const fullName= user.FirstName + " " + user.LastName
    const phone = user.Phone
    const Github = user.Github
    const Twitter = user.Twitter
    const Instagram = user.Instagram
    const Facebook = user.Facebook

    res.render('profile',{title, address, fullName, email, phone, Github, Twitter, Instagram, Facebook});

}))


    

});

module.exports = router;
