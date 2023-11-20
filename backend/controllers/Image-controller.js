import mongoose from "mongoose";
import User from "../model/User";
import Image from "../model/Image"



export const addImage = async(req,res,next) =>{
    const image=req.body.image;
    const user=req.body.user
    const myvari=req.body.vari;
    console.log(myvari)
    console.log(user)
    console.log(image)
    // const {image,user} = req.body;
    let existingUser;
    try{
      existingUser= await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to find User By this Id"})
    }
    const img= new Image({
        image,
        user,
    });
    try{
      const session = await mongoose.startSession();
      session.startTransaction();
      await img.save({session});
      existingUser.Image.push(img);
      await existingUser.save({session})
      await session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
    return res.status(200).json({img});
}

export const getByUserId = async(req,res,next) =>{
    const userId=req.params.id;
    let userimages;
    try{
        userimages= await User.findById(userId).populate("Image");
    }catch(err){
        return console.log(err);
    }
    if(!userimages){
        return res.status(404).json({message:"No Blogs Found"});
    }
    return res.status(200).json({user:userimages});
}