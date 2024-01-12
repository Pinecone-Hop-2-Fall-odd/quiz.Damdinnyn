import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  Addroom,
  loginToRoom,
  handleToRequestStatus,
  exchangeProblem,
} from "../controllers/playRoom-controller.js";
export const playRoomRouter = express.Router();
playRoomRouter.post("/Addroom", verifyToken, Addroom);
playRoomRouter.post("/loginToRoom", verifyToken, loginToRoom);
playRoomRouter.get("/handleToRequestStatus/:roomId", handleToRequestStatus);
playRoomRouter.post("/exchangeProblem", verifyToken, exchangeProblem);
