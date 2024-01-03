import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addfile } from "../controllers/file-controller.js";
export const fileRouter = express.Router();
fileRouter.post("/addfile", verifyToken, addfile)
