import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    name : { type : String, required: true },
    username : { type : String, required: true },
    email : { type : String, required: true },
    password : { type : String, required: true },
    avatar : { type : String, required: true },
    gender : { type : String, required: true },
    birthday : { type : String, required: true },
    role : { type : String, required: true },
    created : { type : Date, required : true },
})

export default mongoose.model('users', setSchema);