import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  Addroom,
  loginToRoom,
  handleToRequestStatus,
} from "../controllers/playRoom-controller.js";
export const playRoomRouter = express.Router();
playRoomRouter.post("/Addroom", verifyToken, Addroom);
playRoomRouter.post("/loginToRoom", verifyToken, loginToRoom);
playRoomRouter.get("handleToRequestStatus", verifyToken, handleToRequestStatus);
