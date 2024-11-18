const express = require('express');
const router = express.Router();
const {User} = require('../../Models/Models.js');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config();

router.get('/account', async (req, res) => {
    const token = req.cookies.accessToken;
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!token){
        res.status(401).send('User has been logged out');
        return;
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        const user = await User.findOne({email});

        res.status(200).json(user);
    }
    catch(error){
        const message = error.message;
        res.status(500).send(message);
    }


})

module.exports = router;