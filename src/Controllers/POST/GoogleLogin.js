const express = require('express');
const router = express.Router();
const {User} = require('../../Models/Models.js');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config();

//this is where i left off i will need to make a fetch request to the URI below and request the user data from their google account

router.post('/google-login', async (req, res) => {
    const {token} = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;  

    try{
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token.access_token}`);
        const userInfo = await response.json();
        const email = userInfo.email;

        const user = await User.findOne({email});
        let _id;

        if(!user){
            const new_user = new User({email, password: ''});
            const userData = await new_user.save();                              //i need to get the _id property of the user from here
            _id = userData._id;
        }
        else
            _id = user._id;

        const accessToken = jwt.sign({id: _id, email}, JWT_SECRET, {expiresIn: '1h'});

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 60
        })
        
        res.status(200).send('User has logged in successfully with google');
            
    }
    catch(error){
        const message = error.message;
        res.status(500).send(message);
    }
})

module.exports = router;