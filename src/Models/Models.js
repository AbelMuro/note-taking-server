const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: Number, required: true}
})

const User = mongoose.model('user', userSchema, 'accounts')        //create a model that will be used to create documents

module.exports = {
    User
}