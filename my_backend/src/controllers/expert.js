import { expertModel } from "../expertModul.js";
export async function addproblem(request, response) {
  const body = request.body;
  const newQuiz = expertModel.create({
    question: body.question,
    answer: body.answer,
    id: body.id,
  });
  response.status(200).json({ newQuiz });
}
