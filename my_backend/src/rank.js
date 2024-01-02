import fs from "fs";
import express from "express";
import { RankModel } from "./rank_model.js";
//const fs = require('fs');
//const express = require("express");
export const rankRouter = express.Router();
//const RankModel = require('./rank_model');

rankRouter.post("/rankquiz", async (req, res) => {
  const body = req.body;
  const newdata = RankModel.create({
    question: body.question,
    a_answer: body.a_answer,
    b_answer: body.b_answer,
    c_answer: body.c_answer,
    d_answer: body.d_answer,
    correctAnswer: body.correctAnswer,
    quizId: body.quizId,
  });
  res.status(200).json({ newdata });
});
rankRouter.get("/rankquiz/:quizId", async (req, res) => {
  const { quizId } = req.params;
  const quizData = await RankModel.findOne({ quizId: quizId });
  console.log(quizData);
  res.status(200).json({ quizData });
});

// module.exports = router
