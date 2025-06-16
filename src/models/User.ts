import mongoose from "mongoose";
// type 

// import { Document } from "mongoose";
// interface IUser extends Document {   
//     name: string;
//     email: string;
//     password: string;
// }
type UserDocument = mongoose.Document & {
    name: string;   
    email: string;
    password: string;};

const UserSchema = new mongoose.Schema<UserDocument>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
},
{timestamps:true});

const User = mongoose.model("User", UserSchema);
export default User;