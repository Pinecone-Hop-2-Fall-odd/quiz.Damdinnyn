// const fs = require('fs');
// const express = require("express")
// const QuizModel = require('./quiz_model');
import fs from "fs"
import express from "express"
import { QuizModel } from "./quiz_model.js"
//import fs from "fs"

export const quizRouter = express.Router()

quizRouter.get('/quiz', async (req, res) => {
    const quizData = await QuizModel.find();
    res.status(200).json({ quizData })
})

quizRouter.post('/quiz', async (req, res) => {
    const body = req.body
    console.log(req.body)
    const newdata = QuizModel.create({ question: body.question, a_answer: body.a_answer, b_answer: body.b_answer, c_answer: body.c_answer, d_answer: body.d_answer, correctAnswer: body.correctAnswer });

    // const userData = await UserModel.find();

    res.status(200).json({ newdata })
})


// module.exports = router