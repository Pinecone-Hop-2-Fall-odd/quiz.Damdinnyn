import express from "express";
import { verifyToken } from "../middleware/auth.js";

export const expertRouter = express.Router();