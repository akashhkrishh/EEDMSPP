const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    username: { type: String, required: true, unique: true, },
    email: { type: String, required: true, unique: true, },
    gender: { type: String, required: true, },
    phone: { type: String, required: true, },
    place: { type: String, required: true, },
    pincode: { type: String, required: true, },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;