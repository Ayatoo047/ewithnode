const express = require("express");
const _ = require("lodash");
const bcrypt = require('bcrypt');

const Category = require('../models/category');
const User = require('../models/user');
const validateUser = require('../validation/user');
// import { validateUser } from "../validation/product";
const router = express.Router()

// router.get("/", (req, res) => {
//     res.send("Hello World from Product")
// })

router.post('/', async (req, res) => {
    try {
      let data = req.body;
      let error = validateUser(data, res);
      if (error) return
      let user = User.findOne({email: data.email})
      if (user){
        res.status(400).json({message:"User already exist."})
        return
      }


      user = new User(_.pick(req.body, ['name', 'email', 'password']));
      // encrypt user password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save()
      
    //   const newUser = new User(user);
    //   const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

module.exports = router;


