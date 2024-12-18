const express = require('express');
const router = express.Router();
const {User} = require('../../Models/Models.js');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config();

//this is where i left off i will need to make a fetch request to the URI below and request the user data from their google account

router.post('/google-login', async (req, res) => {
    const {token} = req.body;

    try{
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token.access_token}`);
        const userInfo = await response.json();
        const email = userInfo.email;

        const user = await User.findOne({email});

        if(!user){
            const new_user = new User({email, password: ''});
            await new_user.save();                              //i need to get the _id property of the user from here
        }
            
    }
    catch(error){

    }
})

module.exports = router;