import { playRoom_Model } from "../Model/play_friend.js";
import { UserModel } from "../Model/user_model.js";

export async function Addroom(req, res) {
  const user = req.user;
  const body = req.body;
  //console.log(body.toId);
  const Auser = await UserModel.findOne({ _id: user.id });
  const A_username = Auser.username;
  const A_profile = Auser.profile;
  const newRoom = await playRoom_Model.create({
    Aplayer: user.id,
    Bplayer: body.toId,
    requestPlay: false,
    roomId: body.toId,
    Aname: A_username,
    Aprofile: A_profile,
    // A_playerProblem: {
    //   question: "sssss",
    // },
    // B_playerProblem: {
    //   question: "llllll",
    // },
  });

  res.status(200).json(newRoom._id);
  console.log("id", newRoom._id);
}
export async function loginToRoom(req, res) {
  const user = req.user;
  const body = req.body;
  console.log(user.id);
  const room = await playRoom_Model.findByIdAndUpdate(body.roomId, {
    requestPlay: true,
  });
  console.log("hi", room);
}
export async function exitToRoom(req, res) {
  const user = req.user;
  const body = req.body;
  console.log(user.id);
  const room = await playRoom_Model.findByIdAndUpdate(body.roomId, {
    requestPlay: false,
  });
  console.log("hi", room);
}
export async function handleToRequestStatus(req, res) {
  const user = req.user;
  const { roomId } = req.params;
  const room = await playRoom_Model.findById(roomId);
  if (room.requestPlay == true) {
    res.status(200).json("allowed request");
  } else {
    res.status(401);
  }
}
export async function exchangeProblem(req, res) {
  const user = req.user;
  const body = req.body;
  //console.log("complete")
  const room = await playRoom_Model.findById(body.roomId);
  console.log(body.a_answer)
  if (room.Aplayer == user.id) {
    await playRoom_Model.findByIdAndUpdate(body.roomId, {
      A_playerProblem: {
        question: body.question,
        a_answer: body.a_answer,
        b_answer: body.b_answer,
        c_answer: body.c_answer,
        d_answer: body.d_answer,
        correct_answer: body.correctAnswer,
      },
    });
  } else if (room.Bplayer == user.Id) {
    await playRoom_Model.findByIdAndUpdate(body.roomId, {
      B_playerProblem: {
        question: body.question,
        a_answer: body.a_answer,
        b_answer: body.b_answer,
        c_answer: body.c_answer,
        d_answer: body.d_answer,
        correct_answer: body.correctAnswer,
      },
    });
  }
}
