import express from "express";
import {
  getOneUser,
  getUser,
  Passedlevels,
  changeProfile,
  userReqInfo,
  changeCollection1,
  changeCollection2,
  addUser,
  reqFriend,
  reqFriendsData,
  reqFriendId,
  allowReq,
  refuseReq,
  myFriendsdata,
  anotherUserData,
  addClassicScore,
  minusClassicScore,
  invitationGame
} from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/auth.js";
export const userRouter = express.Router();

userRouter.get("/userdata", verifyToken, getUser);
userRouter.post("/userdata", verifyToken, getOneUser);
userRouter.post("/passedlevels", verifyToken, Passedlevels);
userRouter.post("/profile", verifyToken, changeProfile);
userRouter.post("/collection1", verifyToken, changeCollection1);
userRouter.post("/collection2", verifyToken, changeCollection2);
userRouter.post("/password", verifyToken, changeCollection2);
userRouter.post("/addUser", addUser);
userRouter.post("/reqFriend", verifyToken, reqFriend);
userRouter.post("/reqFriendId", verifyToken, reqFriendId);
userRouter.post("/reqFriendInfo", verifyToken, userReqInfo);
userRouter.post("reqFriendsData", reqFriendsData);
userRouter.post("/allowReq", verifyToken, allowReq);
userRouter.post("/refuseReq", verifyToken, refuseReq);
userRouter.post("/myFriendsdata", verifyToken, myFriendsdata);
userRouter.get("/anotherUserData/:id", anotherUserData);
userRouter.post("/addClassicScore", verifyToken, addClassicScore);
userRouter.post("/minusClassicScore", verifyToken, minusClassicScore);
userRouter.post("/invitationGame", verifyToken, invitationGame)
//fetchmyFriendsdata
