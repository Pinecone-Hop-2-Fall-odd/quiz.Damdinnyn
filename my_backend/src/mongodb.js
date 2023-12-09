import mongoose from "mongoose"
const url = "mongodb+srv://nymaa:OYIHtFlyPIWjpzPu@cluster0.fgp6xm2.mongodb.net/";
//mongodb+srv://<username>:<password>@cluster0.fgp6xm2.mongodb.net/

export const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log("successfully connected")
    } catch (error) {
        console.log(error)

    }
}