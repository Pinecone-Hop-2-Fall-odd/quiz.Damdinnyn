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
    const userData = await userModel.findOne({ username: body.username })

    console.log(userData)
    if (userData?.password == body.password)
        res.status(200).json({ userData });
    else
        //throw new Error('');
        res.status(400).json({ errorMessage: "oldsongue" });
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
//put 
app.put("/users", async (req, res) => {
    const body = req.body
    const userData = await userModel.find({ _id: body._id })
    const createdata = { profile: body.profile }
    console.log(body.profile)
    userData.push(createdata)
    res.status(200).json({ userData })
})




app.listen(port, () => {
    console.log("power on" + port)
})