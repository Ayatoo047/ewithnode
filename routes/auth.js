const express = require("express")
const mongoose = require("mongoose");
const User = require('../models/user')
const bcrypt = require("bcrypt");

const router = express.Router();

// login
router.post('/', async (req, res) => {
    let user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Invalid email or password.');

    // compare the password with user password
    const validPassword = bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken()

    res.status(200).send(token)
})

module.exports = router;
