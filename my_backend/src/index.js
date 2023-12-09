import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import cors from 'cors'
import { UserModel } from './user_model.js'
import { quizRouter } from "./quiz.js"
import { rankRouter } from './rank.js'
import { connect } from "./mongodb.js"

// const bcrypt = require("bcrypt")
// const jwt = require('jsonwebtoken')
// const connectMongo = require('./mongodb');
// const UserModel = require('./user_model');

const app = express();

connect()
app.use(cors())
app.use(express.json())
const port = 3002;
// UserModel.create({ username: "dorj", email: "dorj@gmail.com" });

//quiz
// const quiz = require("./quiz")
app.use(quizRouter)
// const rank = require("./rank")
app.use(rankRouter)

// const verifyToken = (req, res, next) => {
//     const token = req.headers["token"]
//     if (!token) {
//         return res.status(403).json({ success: false, message: "aldaaa" })
//     }
//     try{
//         const decoded=jwt.verify(token,"asadsf");
//         req.user=decoded
//     }catch(error){
//         return res.status(401).json({success:false,message:"aldaaaaaa"})
//     }
// }
//token
// app.get("/token", async (res, req, next) => {
//     //const token = req.header["token"] || req.body.token
//     const body = req.body
//     if (!body.token) {
//         return res.status(403).json({ success: false, message: "aldaaa" })
//     }
//     try {
//         const decoded = jwt.verify(body.token, "mykey")
//         req.user = decoded
//     } catch (err) {
//         return res.status(401).json({ success: false, message: "aldaaaaaa" })
//     }
//     return next();
// })


app.post('/users', async (req, res) => {
    const body = req.body
    const hashed = await bcrypt.hash(body.password, 10)
    const newdata = UserModel.create({ username: body.username, age: body.age, phoneNumber: body.phoneNumber, password: hashed, userId: Date.now().toString(), passedlevels: ["1"] });
    res.status(200).json({ newdata })
})
//
app.post('/password', async (req, res) => {
    const body = req.body
    const userData = await UserModel.findOne({ phoneNumber: body.phoneNumber })
    if (await bcrypt.compare(body.password, userData.password)) {
        res.status(200).json({ userData });
        // sha256
        //const token = jwt.sign({ id: userData._id }, "SomeSecretKey", { expiresIn: "2h" });
        // asdhsaoif09saphut90347532uriofes => {id: 'asjdiosa'}

        //res.status(200).json({ token });
    } else {
        res.status(405).json({ message: "hereglegch alga" })
    }
})
//
app.post('/userdata', async (req, res) => {
    const body = req.body
    const userData = await UserModel.findOne({ _id: body.userId })
    res.status(200).json({ userData });
    console.log(userData)
})
//get UserData
app.get('/userdata/:userId', async (req, res) => {
    const { userId } = req.params
    const userData = await UserModel.findOne({ _id: userId })
    const data = userData?.passedlevels
    res.status(200).json({ data });
    console.log(data)
})

//get
app.get('/users', async (req, res) => {
    const userData = await UserModel.find();
    const correctdata = userData.map((cur) => ({ userId: cur.userId, username: cur.username, phoneNumber: cur.phoneNumber }))
    res.status(200).json({ userData })
})
//profile
app.post("/profile", async (req, res) => {
    const body = req.body
    const userData = await UserModel.findByIdAndUpdate(body._id, { profile: body.profile })
    res.status(200).json({ userData })
})
//collection
app.post("/collection1", async (req, res) => {
    const body = req.body
    const userData = await UserModel.findByIdAndUpdate(body._id, { mycollection1: body.mycollection1 })
    res.status(200).json({ userData })
})
app.post("/collection2", async (req, res) => {
    const body = req.body
    await UserModel.findByIdAndUpdate(body._id, { mycollection2: body.mycollection2 })
    const userData = await UserModel.findById(body._id)
    res.status(200).json({ userData })
})

//passedlevels
app.post("/passedlevels", async (req, res) => {
    const body = req.body
    await UserModel.findByIdAndUpdate(body._id, { $push: { passedlevels: body.levelId } })
    const userData = await UserModel.findById(body._id)
    console.log(userData)
    res.status(200).json({ userData })
})
//searchUser
app.get("/searchUser/:name", async (req, res) => {
    const { name } = req.params
    //console.log("nmae", name)
    const findedUser = await UserModel.find({ username: name })
    const data = findedUser.map((cur) => ({ username: cur.username, profile: cur.profile, _id: cur._id }))
    ///console.log(findedUser)
    res.status(200).json({ data })
})
//requestFriend
app.post("/reqfriend", async (req, res) => {
    try {
        const body = req.body
        await UserModel.findByIdAndUpdate(body.toId, { $push: { requestFriend: body._id } })
        const reqData = await UserModel.findById(body.toId)
        res.json({ reqData })
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
})

app.listen(port, () => {
    console.log("power on" + port)
})