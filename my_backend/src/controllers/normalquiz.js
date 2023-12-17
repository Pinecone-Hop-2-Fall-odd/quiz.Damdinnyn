import { QuizModel } from "../quiz_model.js";
export async function quizadd(req, res) {
    const user = req.user
    const body = req.body
    console.log(req.body)
    const newdata = QuizModel.create({ question: body.question, a_answer: body.a_answer, b_answer: body.b_answer, c_answer: body.c_answer, d_answer: body.d_answer, correctAnswer: body.correctAnswer, whoIsDone: user.id });
    // const userData = await UserModel.find();
    res.status(200).json({ newdata })
}
export async function quizplay(req, res) {
    const quizData = await QuizModel.find();
    res.status(200).json({ quizData })
}