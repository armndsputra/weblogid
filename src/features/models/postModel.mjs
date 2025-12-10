import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    user : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
    title : { type : String, required: true },
    content : { type : String, required: true },
    thumbnail : { type : String, required: true },
    createdAt : { type : Date, required : true },
})

export default mongoose.model('posts', setSchema);