import mongoose from "mongoose";

const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {type: String},
    password: {type: String}
})

export default mongoose.model("Users", userSchema)

