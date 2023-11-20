import mongoose from "mongoose";


const Schema = mongoose.Schema;


const imagesSchema = new Schema({
    image: {
        type: String,
        required:true,
       },
       user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

export default mongoose.model("Images" , imagesSchema);