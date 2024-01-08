import { model, Schema } from "mongoose";

const expertQuiz = new Schema({
  question: String,
  answer: String,
  id: Number,
});
export const expertModel = model("expertquiz", expertQuiz);
