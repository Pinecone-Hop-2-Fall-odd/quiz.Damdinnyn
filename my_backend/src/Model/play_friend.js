import { model, Schema } from "mongoose";
const A_playerSchema = new Schema({
    question: String
})
const B_playerSchema = new Schema({
    question: String
})

const playRoomWithFriend = new Schema({
    Aplayer: String,
    Bplayer: String,
    time: Number,
    A_playerProblem: [A_playerSchema],
    B_playerProblem: [B_playerSchema]
})
export const playRoom_Model = model("playroom", playRoomWithFriend)