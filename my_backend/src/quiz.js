const fs = require('fs');
const express = require("express")
const router = express.Router()
const quizModel = require('./quiz_model');

router.get('/quiz', async (req, res) => {
    const quizData = await quizModel.find();

    res.status(200).json({ quizData })
})

router.post('/quiz', async (req, res) => {
    const body = req.body
    console.log(req.body)
    const newdata = quizModel.create({ question: body.question, a_answer: body.a_answer, b_answer: body.b_answer, c_answer: body.c_answer, d_answer: body.d_answer, correctAnswer: body.correctAnswer });

    // const userData = await userModel.find();

    res.status(200).json({ newdata })
})


module.exports = router