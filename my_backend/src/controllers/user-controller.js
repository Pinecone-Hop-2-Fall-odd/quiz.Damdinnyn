import { UserModel } from "../user_model.js";
import bcrypt from "bcrypt";

export async function getUser(req, res) {
  const user = req.user;
  const userData = await UserModel.findOne({ _id: user.id });
  const data = userData?.passedlevels;
  res.status(200).json({ data });
  //console.log(data);
}

export async function getOneUser(req, res) {
  const user = req.user;
  const userData = await UserModel.findOne({ _id: user.id });
  // console.log(userData);
  //const reqFriend = userData.requestFriend
  res.status(200).json({ userData });
}
export async function reqFriendId(req, res) {
  const user = req.user;
  const userData = await UserModel.findOne({ _id: user.id }).populate(
    "requestFriend"
  );
  const reqFriend = userData.requestFriend.map((cur) => ({
    username: cur.username,
    profile: cur.profile,
  }));
  res.status(200).json({ reqFriend });
}
export async function Passedlevels(req, res) {
  const user = req.user;
  const body = req.body;
  //console.log(user)
  console.log(body.levelId);
  await UserModel.findByIdAndUpdate(user.id, {
    $push: { passedlevels: body.levelId },
  });
  const userData = await UserModel.findById(user._id);
  //console.log(userData)
  res.status(200).json({ userData });
}
export async function changeProfile(req, res) {
  const body = req.body;
  const user = req.user;
  const userData = await UserModel.findByIdAndUpdate(user.id, {
    profile: body.profile,
  });
  res.status(200).json({ userData });
}
export async function changeCollection1(req, res) {
  const user = req.user;
  const body = req.body;
  const userData = await UserModel.findByIdAndUpdate(user.id, {
    mycollection1: body.mycollection1,
  });
  res.status(200).json({ userData });
}
export async function changeCollection2(req, res) {
  const user = req.user;
  const body = req.body;
  const userData = await UserModel.findByIdAndUpdate(user.id, {
    mycollection2: body.mycollection2,
  });
  res.status(200).json({ userData });
}
export async function addUser(req, res) {
  const body = req.body;
  const hashed = await bcrypt.hash(body.password, 10);
  const newdata = UserModel.create({
    username: body.username,
    age: body.age,
    phoneNumber: body.phoneNumber,
    password: hashed,
    userId: Date.now().toString(),
    passedlevels: ["1"],
  });
  res.status(200).json({ NewUser: newdata, stat: true });
}
export async function reqFriend(req, res) {
  const user = req.user;
  try {
    const body = req.body;
    const reqData = await UserModel.findById(body.toId);
    if (reqData.requestFriend.includes(user.id)) {
    } else {
      await UserModel.findByIdAndUpdate(body.toId, {
        $push: { requestFriend: user.id },
      });
      res.json({ reqData });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
export async function userReqInfo(req, res) {
  const body = req.body;
  const users = await Promise.all(
    body.id.map(async (id) => await UserModel.findById(id))
  );
  res.status(200).json({ users });
}
export async function reqFriendsData(req, res) {
  res.json({ message: "assa" });
}
export async function allowReq(req, res) {
  const user = req.user;
  const body = req.body;
  await UserModel.findByIdAndUpdate(user.id, {
    $push: { myFriends: body.reqId },
  });
  console.log("bobo");
  //   const reqId = reqData.requestFriend.includes(body.reqId);
  //   console.log(reqId);
  res.status(200).json({ reqData: "connected" });
}
export async function refuseReq(req, res) {}
export async function myFriendsdata(req, res) {
  const body = req.body;
  console.log(body.id);
  const friendsdata = await Promise.all(
    body.id.map(async (id) => await UserModel.findById(id))
  );
  console.log(friendsdata);
  res.status(200).json({ friendsdata });
}
