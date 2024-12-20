const express = require('express');
const router = express.Router();
const {User} = require('../../Models/Models.js')


router.post('/register', async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = new User({email, password});
        await user.save();

        res.status(200).send('Account has been created');
    }
    catch(error){
        const message = error.message;
        if(message.includes('E11000 duplicate key error collection:'))
            res.status(401).send('Email already exists');
        else
            res.status(500).send(message);
    }
});

module.exports = router;