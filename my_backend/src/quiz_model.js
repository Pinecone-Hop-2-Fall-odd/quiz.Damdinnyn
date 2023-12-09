// const { model, Schema } = require("mongoose");
import { model, Schema } from "mongoose"

const QuizSchema = new Schema({
    question: String,
    a_answer: String,
    b_answer: String,
    c_answer: String,
    d_answer: String,
    correctAnswer: Number,
})

export const QuizModel = model('quiz', QuizSchema);

//module.exports = QuizModel;