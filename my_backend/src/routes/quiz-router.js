import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { quizadd, quizplay } from "../controllers/normalquiz.js"
export const quizRouter = express.Router()
quizRouter.post("/quiz", verifyToken, quizadd)
quizRouter.get("/quiz", quizplay)
