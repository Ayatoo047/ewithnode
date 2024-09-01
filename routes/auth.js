const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user')
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
    let user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Invalid email or password.');

    // compare the password with user password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken()
})