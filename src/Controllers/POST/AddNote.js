const express = require('express');
const mongoose = require('mongoose');
const {User} = require('../../Models/Models.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {config} = require('dotenv');
const ObjectId = mongoose.Types.ObjectId;
config();

router.post('/add-note/:type', async (req, res) => {
    const type = req.params.type;
    const {title, tags, lastEdited, body} = req.body;
    const id = new ObjectId();
    const token = req.cookies.accessToken;
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!token)
        return res.status(401).send('Please enable third-party cookies and cross-site-tracking to use this app');

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;
        const user = await User.findOne({email});
        if(!user)
            return res.status(404).send('Document not found');

        const notes = user.notes || [];
        notes.push({id, title, tags, lastEdited, body, archived: type === 'archived'});
        user.notes = notes;
    
        await user.save();
        res.status(200).send(`${id}`);
    }
    catch(error){
        if(error.message.includes('E11000 duplicate key error collection'))
            res.status(403).send('Document with the specified _id already exists')
        else if(error.message.includes('user validation failed'))
            res.status(403).send('Validation error, document is missing required properties')
        else
            res.status(500).send(error.message);
    }
});

module.exports = router;