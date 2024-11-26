const express = require('express');
const {User} = require('../../Models/Models.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {config} = require('dotenv');
config();

router.put('/update-archived-note', async (req, res) => {
    const {id, title, tags, body, lastEdited} = req.body;   
    const token = req.cookies.accessToken;
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!token)
        return res.status(401).send('Please log in again, you have been logged off for security purposes');

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;
        const user = await User.findOne({email});
        if(!user) 
            return res.status(404).send('Document not found');
        let archivedNotes = user.archivedNotes;
        archivedNotes = archivedNotes.map((note) => {
            if(note.id.equals(id))
                return {...note, title, tags, body, lastEdited}
            else
                return note;
        });
        user.archivedNotes = archivedNotes;
        await user.save();
        res.status(200).send('Archived Note has been successfully updated');
    }
    catch(error){
        if(error.message.includes('E11000 duplicate key error collection'))
            res.status(403).send('Document with the specified _id already exists')
        else if(error.message.includes('user validation failed'))
            res.status(403).send('Validation error, document is missing required properties')
        else
            res.status(500).send(error.message);
    }
})

module.exports = router;