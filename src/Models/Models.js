const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    notes: {type: Array},
    archivedNotes: {type: Array},
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date}
});

userSchema.pre('save', async function (next) {              //pre() is a middleware that executes a function before the 'save' method is executed
    if(!this.isModified('password'))                        //if the password has NOT been modified
        return next();                                      //will execute the next middleware, if there are no more middlewares, then save() will be called

    const salt = await bcrypt.genSalt(10);                  //generates a salt (a random value that is added to the password to enhance security) 
    this.password = await bcrypt.hash(this.password, salt); //we hash the password (convert the password into a random sequence of characters) 
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) { 
    return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.methods.createPasswordResetToken = function() {   
    const resetToken = crypto.randomBytes(32).toString('hex'); 
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;     // Token expires in 10 minutes
    return resetToken;
}      

const User = mongoose.model('user', userSchema, 'accounts');        //create a model that will be used to create documents

module.exports = {
    User,
}