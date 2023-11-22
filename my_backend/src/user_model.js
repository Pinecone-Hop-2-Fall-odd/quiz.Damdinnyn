const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    username: String,
    age: Number,
    phoneNumber: Number,
    password: String,
    userId: String
})

const UserModel = model('user', UserSchema);

module.exports = UserModel;