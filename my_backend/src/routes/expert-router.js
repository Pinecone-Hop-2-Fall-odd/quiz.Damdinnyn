import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addproblem } from "../controllers/expert.js";
export const expertRouter = express.Router();
expertRouter.post("/addproblem", addproblem);
