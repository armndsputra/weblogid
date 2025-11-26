import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    user : { type : String, required: true },
    title : { type : String, required: true },
    content : { type : String, required: true },
    thumbnail : { type : String, required: true },
    created : { type : Date, required : true },
})

export default mongoose.model('contents', setSchema);