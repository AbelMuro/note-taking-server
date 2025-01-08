const express = require('express');
const router = express.Router();
const {User} = require('../../Models/Models.js');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config();

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;    

    try{
        const user = await User.findOne({email});

        if(!user || !(await user.matchPassword(password))){
            res.status(401).send('Invalid Credentials');
            return;
        }
            
        const token = jwt.sign({id: user._id, email: email}, JWT_SECRET, {expiresIn: '1h'});

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60
        });

        res.status(200).send('User is logged in');
    }
    catch(error){
        const message = error.message;
        res.status(500).send(message);
    }
})

module.exports = router;