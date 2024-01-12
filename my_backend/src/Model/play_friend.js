import { model, Schema } from "mongoose";
const A_playerSchema = new Schema({
  question: String,
  a_answer: String,
  b_answer: String,
  c_answer: String,
  d_answer: String,
  correct_answer: Number,
});
const B_playerSchema = new Schema({
  question: String,
  a_answer: String,
  b_answer: String,
  c_answer: String,
  d_answer: String,
  correct_answer: Number,
});
const playRoomWithFriend = new Schema({
  Aplayer: String,
  Aname: String,
  Aprofile: String,
  Bplayer: String,
  Bname: String,
  Bprofile: String,
  time: Number,
  requestPlay: Boolean,
  roomId: String,
  A_playerProblem: A_playerSchema,
  B_playerProblem: B_playerSchema,
});
export const playRoom_Model = model("playroom", playRoomWithFriend);
