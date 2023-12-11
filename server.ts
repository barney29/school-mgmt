import { log } from 'console';
import server from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({path: './.env'});

mongoose.connect(`${process.env.MONGODB_STR}`, {

}).then(()=>{
    console.log("Mongo db connected successfully");
}).catch((e: Error) => {
    console.log(e.message);
})
const PORT = process.env.PORT || 3000;



server.listen(PORT, () => log("Server is running at " + PORT));