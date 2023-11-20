const mongoose = require("mongoose")
const url = "mongodb+srv://nymaa:OYIHtFlyPIWjpzPu@cluster0.fgp6xm2.mongodb.net/";
//mongodb+srv://<username>:<password>@cluster0.fgp6xm2.mongodb.net/

const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log("successfully connected")
    } catch (error) {
        console.log(error)

    }
}

module.exports = connect