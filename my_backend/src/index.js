import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import cors from "cors";
//import { UserModel } from "./user_model.js";
import { UserModel } from "./Model/user_model.js";
import { rankRouter } from "./rank.js";
import { connect } from "./mongodb.js";
import { userRouter } from "./routes/user-router.js";
import { quizRouter } from "./routes/quiz-router.js";
import { fileRouter } from "./routes/file-router.js";
import { expertRouter } from "./routes/expert-router.js";
import { playRoomRouter } from "./routes/play-room-router.js";
const app = express();
connect();
app.use(cors());
app.use(express.json());
const port = 3002;
app.use(fileRouter);
app.use(quizRouter);
app.use(rankRouter);
app.use(expertRouter);
app.use(playRoomRouter)
//toke
// app.get("/token", async (req, res) => {
//     //console.log(req.headers)
//     const token = req.headers["token"]

//     if (!token) {
//         return res.status(403).json({ success: false, message: "aldaaa" })
//     }
//     try {
//         const decoded = jwt.verify(token, "SomeSecretKey")
//         //const userInfo = await UserModel.findById(decoded.id)
//         return res.status(200).json({ decoded })
//     } catch (err) {
//         console.log('err', err);
//         return res.status(401).json({ success: false, message: "aldaaaaaa" })
//     }
// })
//`
app.post("/login", async (req, res) => {
  const body = req.body;
  console.log(body);
  const userData = await UserModel.findOne({ phoneNumber: body.phoneNumber });
  if (bcrypt.compare(body.password, userData.password)) {
    //res.status(200).json({ userData });
    // sha256
    const token = jwt.sign({ id: userData._id }, "SomeSecretKey", {
      expiresIn: "2h",
    });
    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: "hereglegch alga" });
  }
});
app.use(userRouter);
app.post("/profile", async (req, res) => {
  const body = req.body;
  const userData = await UserModel.findByIdAndUpdate(body._id, {
    profile: body.profile,
  });
  res.status(200).json({ userData });
});
app.get("/searchUser/:name", async (req, res) => {
  const { name } = req.params;
  const findedUser = await UserModel.find({ username: name });
  const data = findedUser.map((cur) => ({
    username: cur.username,
    profile: cur.profile,
    _id: cur._id,
    requestFriend: cur.requestFriend,
  }));
  res.status(200).json({ data });
  console.log("search", data);
});
app.get("/searchId/:id", async (req, res) => {
  const { id } = req.params;
  const findedUser = await UserModel.find({ userId: id });
  const data = findedUser.map((cur) => ({
    username: cur.username,
    profile: cur.profile,
    _id: cur._id,
    requestFriend: cur.requestFriend,
  }));
  res.status(200).json({ data });
  console.log("search", data);
});
app.post("/reqfriend", async (req, res) => {
  try {
    const body = req.body;
    await UserModel.findByIdAndUpdate(body.toId, {
      $push: { requestFriend: body._id },
    });
    const reqData = await UserModel.findById(body.toId);
    res.json({ reqData });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
app.listen(port, () => {
  console.log("power on" + port);
});
// app.post("/addClassicScore", async (req, res) => {
//   console.log("sss");
// });
