import { playRoom_Model } from "../Model/play_friend.js";
export async function Addroom(req, res) {
  const user = req.user;
  const body = req.body;
  //console.log(body.toId);
  const newRoom = await playRoom_Model.create({
    Aplayer: user.id,
    Bplayer: body.toId,
    requestPlay: false,
    roomId: body.toId,
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
  console.log(user.id);
  const room = await playRoom_Model.findOneAndUpdate(
    { roomId: user.id },
    {
      requestPlay: true,
    }
  );
  console.log("hi", room);
}
export async function handleToRequestStatus(req, res) {
  const user = req.user;
  const room = await playRoom_Model.findOne({ Aplayer: user.id });
  console.log(room);
  if (room.requestPlay == true) {
    res.status(200).json("allowed request");
  }
}
