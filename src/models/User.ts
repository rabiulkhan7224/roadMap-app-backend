import mongoose from "mongoose";
// type 

import { Document } from "mongoose";
interface IUser extends Document {   
    name: string;
    email: string;
    password: string;
     isAdmin: boolean;
}
type UserDocument = mongoose.Document & {
    name: string;   
    email: string;
    password: string;
   
    };

const UserSchema = new mongoose.Schema<IUser>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin: { type: Boolean, default: false },
},
{timestamps:true});

const User = mongoose.model("User", UserSchema);
export default User;