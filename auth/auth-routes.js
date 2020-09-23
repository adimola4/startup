const express = require("express");
const bycrpt = require('bcryptjs')

const users = require("../models/dbHelpers");
const generateToken = require("./generateToken");

const router = express.Router();

// for all endpoints beginning with /api/users

router.post("/register", (req, res) => {
  const credentials = req.body;
  
  if (!(credentials.Email && credentials.Password)) {
    return res.status(400).json({ message: "email and password required" });
  }

  const hash = bycrpt.hashSync(credentials.Password , 12)
  credentials.Password = hash

  users.addUser(credentials)
    .then(user => res.redirect('/'))
    .catch(error => {
      if (error.errno == 19) {
        res.status(400).json({ message: "Username already taken" });
      } else {
        res.status(500).json({error : error.message});
      }
    });
});

router.post("/login", (req, res) => {
  const credentials = req.body;
  let cookie = req.session

  if (!(credentials.Email && credentials.Password)) {
    return res.status(400).json({ message: "Username and password required" });
  } 

  users.findUserByEmail(credentials.Email)
    .then(user => {  
      credentials.IsTeacher = (credentials.IsTeacher === 'on') ? true : false;
    
      if (user && bycrpt.compareSync(credentials.Password,user.Password) && user.IsTeacher == credentials.IsTeacher ) {
        const token = generateToken(user);
        req.session.user = {
          id : user.ID,
          username : user.Email
        };
             
        console.log("login successful")
        res.redirect('/courses');
        
      } else {
      res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.get("/logout" , (req,res) => {
  if(req.session){
    req.session.destroy()
  }

})

module.exports = router;
