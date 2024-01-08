//import { UserModel } from "../user_model.js";
import { UserModel } from "../Model/user_model.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function getUser(req, res) {
  const user = req.user;
  const userData = await UserModel.findOne({ _id: user.id });
  const data = userData?.passedlevels;
  res.status(200).json({ data });
  //console.log(data);
}

export async function getOneUser(req, res) {
  const user = req.user;
  const userData = await UserModel.findOne({ _id: user.id }).populate(
    ["myFriends"]
  )
  const rawInvitationGame = userData.invitationGame
  const invitationGame = await Promise.all(rawInvitationGame.map(async (e) => {
    const reqUser = await UserModel.findOne({ _id: e })
    return { username: reqUser.username, profile: reqUser.profile, _id: reqUser._id }
  }))
  res.status(200).json({ userData, invitationGame });
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
  //const id = String(body.levelId);
  console.log("id", body.levelId);
  const userData = await UserModel.findById(user.id);
  if (userData?.userRankLevelCount < body.rankId) {
    // console.log(user, body);
    await UserModel.findByIdAndUpdate(user.id, {
      $push: { passedlevels: String(body.levelId) },
      userRankLevelCount: body.rankId,
    });
  }

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
    userRankLevelCount: 1,
    userRank: "Warrior",
    classicPoint: 0,
    classicHigh: 0,
  });
  res.status(200).json({ NewUser: newdata, stat: true });
}
export async function reqFriend(req, res) {
  const user = req.user;
  try {
    const body = req.body;
    const reqData = await UserModel.findById(body.toId);
    if (reqData.myFriends.includes(user.id)) {
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
  const reqReceivedUserData = await UserModel.findByIdAndUpdate(user.id, {
    $push: { myFriends: body.reqId },
  });
  const removeId = reqReceivedUserData.requestFriend.filter(
    (e) => body.reqId != e
  );
  await UserModel.findByIdAndUpdate(user.id, {
    requestFriend: removeId,
  });
  //
  const reqSentUser = await UserModel.findByIdAndUpdate(body.reqId, {
    $push: { myFriends: user.id },
  });
  res.status(200).json({ reqData: "connected" });
}
export async function refuseReq(req, res) {
  const body = req.body;
  const user = req.user;
  const userData = await UserModel.findById(user.id);
  const removeId = userData.requestFriend.filter((e) => body.reqId != e);
  await UserModel.findByIdAndUpdate(user.id, {
    requestFriend: removeId,
  });
}
export async function myFriendsdata(req, res) {
  const body = req.body;
  console.log(body.id);
  const friendsdata = await Promise.all(
    body.id.map(async (id) => await UserModel.findById(id))
  );
  console.log(friendsdata);
  res.status(200).json({ friendsdata });
}
export async function anotherUserData(req, res) {
  const { id } = req.params;
  console.log("id", id);
  const userData = await UserModel.findOne({ _id: id });
  console.log(userData);
  res.status(200).json({ userData });
}
export async function addClassicScore(req, res) {
  const user = req.user;
  //console.log("sssssss", body.token);
  const userdata = await UserModel.findById(user.id);
  const classicHigh = userdata.classicHigh;
  const classicPoint = userdata.classicPoint;
  const score = userdata.classicPoint + 1;
  // console.log(score);
  await UserModel.findByIdAndUpdate(user.id, {
    classicPoint: score,
  });
  if (classicHigh == classicPoint) {
    const score = classicHigh + 1;
    await UserModel.findByIdAndUpdate(user.id, {
      classicHigh: score,
    });
  }
}
export async function minusClassicScore(req, res) {
  const user = req.user;
  const userdata = await UserModel.findById(user.id);
  const score = userdata.classicPoint - 1;
  await UserModel.findByIdAndUpdate(user.id, {
    classicPoint: score,
  });
}
export async function invitationGame(req, res) {
  //console.log("hi bro")
  const user = req.user;
  try {
    const body = req.body;
    const reqData = await UserModel.findById(body.toId);
    await UserModel.findByIdAndUpdate(body.toId, {
      $push: { invitationGame: user.id },
    });
    res.json({ reqData });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
///
