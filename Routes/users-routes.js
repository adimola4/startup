const express = require("express");
const users = require("../models/dbHelpers");

const router = express.Router();

router.get('/' , (req,res) => {
  users.find()
  .then(users => { res.status(200).json(users)})
  .catch(error => {
      res.status(500).json({message : "error to find users"})
  })
})

router.delete('/users/:id' , (req,res) => {
  const {id} = req.params;
  users.remove(id).then(count => { if (count > 0) { 
      res.status(200).json({message : "user removed successfully"})

  } else {
          res.status(404).json({message: "Record not found"})
      }
  })
  .catch(error => {
      res.status(500).json({message : "error to find user"})
  })
})

router.get('/:email' , (req,res) => {
  const {email} = req.params;
  users.findUserByEmail(email)
  .then(users =>{
      if(users){
          res.status(200).json(users);
      }
      else {
          res.status(404).json({message: "Record not found"})
      }
  })
  .catch(error => {
      res.status(500).json({message : "error to find user"})
  })
})

module.exports = router;
