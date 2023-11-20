import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        minlenght: 6
    },
    Image:[{type: mongoose.Types.ObjectId,ref: "Images",required:true}],
});
export default mongoose.model("User",userSchema);