import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { Addroom } from "../controllers/playRoom-controller.js";
export const playRoomRouter = express.Router()
playRoomRouter.post("/Addroom", verifyToken, Addroom)