const express = require('express');
const router = express.Router();
const {User} = require('../../Models/Models.js');
const nodemailer = require('nodemailer');
const {config} = require('dotenv');
config();


router.post('/send_link', async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            res.status(404).send('Email is not registered');
            return;
        }

        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false});
        const resetPasswordLink = `http://localhost:3000/reset/${resetToken}`

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.email,
                pass: process.env.app_password                          //you must create an app password for an app in your gmail acount
            }
        })

        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'Reset Link for Note-taking app',
            text: `Please click on the following link to reset your password <a href={${resetPasswordLink}}>Reset password</a>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                res.status(401).send(error.message);
                return;
            }
            
            res.status(200).send('Email sent successfully');
        })

    }
    catch(error){
        const message = error.message;
        res.status(500).send(message);
    }

})

module.exports = router;
