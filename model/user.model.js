
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Email: { type: String, required: true, unquie: true },
    Password: { type: String, required: true }
})

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    UserModel
}