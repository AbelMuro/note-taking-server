const express = require('express');
const router = express.Router();
const {User} = require('../../Models/Models.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//this is where i left off

router.post('/register', (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);


});

module.exports = router;