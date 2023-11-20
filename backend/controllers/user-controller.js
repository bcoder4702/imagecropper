import User from "../model/User";
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from "fs"
const __dirname = path.resolve();
const stat=path.join(__dirname,'../frontend')
const st=path.join(__dirname,'../frontend/crop-round-image.html')
export const getAllUser = async(req,res,next)=>{

    let users;
    try{
     users= await User.find();      
    } catch (err) {
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No Users found"});
    }
    return res.status(200).json({users});

}

export const signup = async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email
    const password=req.body.password
    console.log(name)
    // const {name,email,password}=req.body;
    let existingUser;
    try{
      existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({messafe: "User Already Exists"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    })
    try{
       await user.save();
    }catch(err){
        console.log(err);
    }
    return res.sendFile('image.html',{root: stat})
    // return res.status(201).json({user});
}

export const login = async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log(email)
    // const {email,password}=req.body;
    let existingUser;
    try{
      existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message: "Couldn't find User by this email"});
    }
    const ispasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!ispasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }
    const userId=existingUser._id
    fs.readFile(st, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
    
        // Replace a placeholder in the HTML file with the user ID
        const modifiedData = data.replace('{{userId}}', userId);
    
        // Send the modified HTML to the client
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(modifiedData);
      });
    // localStorage.setItem("mytime", Date.now());
    return res.sendFile('crop-round-image.html',{root: stat,id:existingUser._id})
    // return res.status(200).json({message: "Login Successfull", user:existingUser});
}