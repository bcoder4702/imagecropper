import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import ImageRouter from './routes/Image-routes';
import bodyParser from "body-parser";
import path from 'path';
import fs from 'fs'
import cors from 'cors'
const app = express();
const __dirname = path.resolve();
const stat=path.join(__dirname,"../frontend")
app.use(express.static(stat))
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))

app.use("/api/user",router)

app.use("/api/image",ImageRouter)

mongoose.connect('mongodb+srv://bverma4702:GGdfA0vh8eMYXUUk@cluster0.exwidlt.mongodb.net/instaclone?retryWrites=true&w=majority'
).then(()=>app.listen(5000)).then(()=>console.log("Connected to Database")).catch((err)=>console.log(err));
 