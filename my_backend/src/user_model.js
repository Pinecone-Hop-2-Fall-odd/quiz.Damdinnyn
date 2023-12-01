const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    username: String,
    age: Number,
    phoneNumber: Number,
    password: String,
    userId: String,
    profile: String,
    passedlevels: Array
})

const UserModel = model('user', UserSchema);

module.exports = UserModel;