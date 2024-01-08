import { QuizModel } from "../quiz_model.js";
export async function quizadd(req, res) {
  const user = req.user;
  const body = req.body;
  console.log(req.body);
  const newdata = QuizModel.create({
    question: body.question,
    a_answer: body.a_answer,
    b_answer: body.b_answer,
    c_answer: body.c_answer,
    d_answer: body.d_answer,
    correctAnswer: body.correctAnswer,
    whoIsDone: user.id,
  });
  // const userData = await UserModel.find();
  res.status(200).json({ newdata });
}
export async function quizplay(req, res) {
  const quizData = await QuizModel.find();
  res.status(200).json({ quizData });
}
export async function MyquizIntoData(req, res) {
  const user = req.user;
  //console.log("hi", user.id);
  const quizdata = await QuizModel.find({ whoIsDone: user.id });
  //console.log("hello", quizdata);
  res.status(200).json({ quizdata });
}
export async function deleteOneQuiz(req, res) {
  const body = req.body;
  console.log(body.id);
  const oneQuizData = await QuizModel.findOneAndDelete({ _id: body.id });
}
export async function editQuiz(req, res) {
  const user = req.user;
  const body = req.body;
  console.log(body.id);
  const oneQuizData = await QuizModel.findByIdAndUpdate(body.id, {
    question: body.question,
    a_answer: body.a_answer,
    b_answer: body.b_answer,
    c_answer: body.c_answer,
    d_answer: body.d_answer,
    correctAnswer: body.correctAnswer,
    whoIsDone: user.id,
  });

  console.log(oneQuizData);
}
export async function getYourQuizData(req, res) {
  console.log("hi");
}
