const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User} = require('../../Models/Models.js');
const {config} = require('dotenv');
config();

router.get('/get-notes/:type', async (req, res) => {
    const type = req.params.type;
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
        let allNotes;
        if(type === 'archived')
            allNotes = user.notes.filter(note => note.archived);
        else if(type === 'notes')
            allNotes = user.notes.filter(note => !note.archived);
        else if(type === 'tags'){
            const notes = user.notes;
            let allTags = notes.reduce((acc, note) => [...acc, ...note.tags.split(',')], []);
            allTags = [...new Set(allTags)]
            allNotes = allTags;
        }
        else{
            const notes = user.notes;
            const notesWithTags = notes.filter((note => note.tags.includes(type)));
            allNotes = notesWithTags;
        } 
        res.status(200).json(allNotes);
    }
    catch(error){
        if(error.message.includes('user validation failed'))
            res.status(403).send('Validation error, document is missing required properties');
        else
            res.status(500).send(error.message);
    }
})

module.exports = router;