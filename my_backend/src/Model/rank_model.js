// const { model, Schema } = require("mongoose");
import { model, Schema } from "mongoose"
const RankQuiz = new Schema({
    question: String,
    a_answer: String,
    b_answer: String,
    c_answer: String,
    d_answer: String,
    correctAnswer: Number,
    quizId: Number
})
export const RankModel = model('rankquiz', RankQuiz);

//module.exports = RankModel;