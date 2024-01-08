import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  MyquizIntoData,
  quizadd,
  quizplay,
  deleteOneQuiz,
  editQuiz,
  getYourQuizData,
} from "../controllers/normalquiz.js";
export const quizRouter = express.Router();
quizRouter.post("/quiz", verifyToken, quizadd);
quizRouter.get("/quiz", quizplay);
quizRouter.get("/MyquizIntoData", verifyToken, MyquizIntoData);
quizRouter.post("/deleteOneQuiz", verifyToken, deleteOneQuiz);
quizRouter.post("/editQuiz", verifyToken, editQuiz);
quizRouter.get("getYourQuizData", verifyToken, getYourQuizData);
