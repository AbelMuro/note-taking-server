const express = require('express');
const {User} = require('../../Models/Models.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {config} = require('dotenv');
config();

router.put('/change-password', async (req, res) => {
    const {newPassword, oldPassword} = req.body;   
    const token = req.cookies.accessToken;
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!token)
        return res.status(401).send('Please enable third-party cookies and cross-site-tracking to use this app');

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;
        const user = await User.findOne({email});

        if(!(await user.matchPassword(oldPassword)))
            return res.status(403).send('Incorrect Password');

        user.password = newPassword;
        await user.save();
        res.status(200).send('Successfully changed password');

    }
    catch(error){
        if(error.message.includes('E11000 duplicate key error collection'))
            res.status(403).send('Document with the specified _id already exists');
        else if(error.message.includes('user validation failed'))
            res.status(403).send('Validation error, document is missing required properties');
        else
            res.status(500).send(error.message);
    }
})

module.exports = router;