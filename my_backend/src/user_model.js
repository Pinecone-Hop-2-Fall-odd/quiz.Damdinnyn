import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    username: String,
    age: Number,
    phoneNumber: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    userId: String,
    profile: String,
    passedlevels: Array,
    requestFriend: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    mycollection1: String,
    mycollection2: String
    // mycollection1
})

export const UserModel = model('user', UserSchema);
// module.exports = UserModel 
