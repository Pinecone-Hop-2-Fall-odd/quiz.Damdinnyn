import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  Addroom,
  loginToRoom,
  handleToRequestStatus,
  exchangeProblem,
  exitToRoom,
  getRoomData,
  getProblemOfRoom,
  WhoIsTheWinner
} from "../controllers/playRoom-controller.js";
export const playRoomRouter = express.Router();
playRoomRouter.post("/Addroom", verifyToken, Addroom);
playRoomRouter.post("/loginToRoom", verifyToken, loginToRoom);
playRoomRouter.post("/exitToRoom", verifyToken, exitToRoom);
playRoomRouter.get("/handleToRequestStatus/:roomId", handleToRequestStatus);
playRoomRouter.post("/exchangeProblem", verifyToken, exchangeProblem);
playRoomRouter.get("/getRoomData/:roomId", getRoomData);
playRoomRouter.post("/getProblemOfRoom", verifyToken, getProblemOfRoom)
playRoomRouter.post("/WhoIsTheWinner", WhoIsTheWinner)