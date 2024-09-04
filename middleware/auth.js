const jwt = require('jsonwebtoken')
const config = require("config")

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded_token = jwt.verify(token, config.get('jwtPrivateKey')); // save with config
        req.user = decoded_token;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.")
    }
}