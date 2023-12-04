const connectMongo = require('./mongodb');
const express = require("express")
const cors = require('cors')
const userModel = require('./user_model');

const app = express();

connectMongo();
app.use(cors())
app.use(express.json())
const port = 8080;
// userModel.create({ username: "dorj", email: "dorj@gmail.com" });

//quiz
const quiz = require("./quiz")
app.use(quiz)
const rank = require("./rank")
app.use(rank)


app.post('/users', async (req, res) => {
    const body = req.body
    console.log(req.body)
    const newdata = userModel.create({ username: body.username, age: body.age, phoneNumber: body.phoneNumber, password: body.password, userId: Date.now().toString() });

    // const userData = await userModel.find();

    res.status(200).json({ newdata })
})
//
app.post('/password', async (req, res) => {
    const body = req.body
    const userData = await userModel.find({ username: body.username })
    console.log(userData)
    const rightAccound = userData.filter((e) => (
        e.password == body.password
    ))
    res.status(200).json({ rightAccound });



    // if (userData?.password == body.password)
    //res.status(200).json({ userData });
    // else
    //     //throw new Error('');
    //     res.status(400).json({ errorMessage: "oldsongue" });
})
//
app.post('/userdata', async (req, res) => {
    const body = req.body
    const userData = await userModel.findOne({ _id: body.userId })
    res.status(200).json({ userData });
    console.log(userData)
})

//get
app.get('/users', async (req, res) => {
    const userData = await userModel.find();
    const correctdata = userData.map((cur) => ({ userId: cur.userId, username: cur.username, phoneNumber: cur.phoneNumber }))
    res.status(200).json({ userData })
})
//profile
app.post("/profile", async (req, res) => {
    const body = req.body
    const userData = await userModel.findByIdAndUpdate(body._id, { profile: body.profile })
    res.status(200).json({ userData })
})
//collection
app.post("collection", async (req, res) => {
    const body = req.body
    await userModel.findByIdAndUpdate(body._id, { $push: { mycollection: body.collection } })
    const userData = await userModel.findById(body._id)
    console.log(userData)
    res.status(200).json({ userData })


})

//passedlevels
app.post("/passedlevels", async (req, res) => {
    const body = req.body
    await userModel.findByIdAndUpdate(body._id, { $push: { passedlevels: body.levelId } })
    const userData = await userModel.findById(body._id)
    console.log(userData)
    res.status(200).json({ userData })
})
//searchUser
app.get("/searchUser/:name", async (req, res) => {
    const { name } = req.params
    //console.log("nmae", name)
    const findedUser = await userModel.find({ username: name })
    const data = findedUser.map((cur) => ({ username: cur.username, profile: cur.profile }))
    ///console.log(findedUser)
    res.status(200).json({ data })
})

app.listen(port, () => {
    console.log("power on" + port)
})