import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  MyquizIntoData,
  quizadd,
  quizplay,
} from "../controllers/normalquiz.js";
export const quizRouter = express.Router();
quizRouter.post("/quiz", verifyToken, quizadd);
quizRouter.get("/quiz", quizplay);
quizRouter.get("MyquizIntoData", verifyToken, MyquizIntoData);
