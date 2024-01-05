import { model, Schema } from "mongoose";

const expertQuiz = new Schema({
    question: String,
    answer: String
})
export const expertModel = model("expertquiz", expertQuiz)
