import { model, Schema } from "mongoose";
const FileSchema = new Schema({
    fileName: String
});
export const FileModel = model("file", FileSchema);