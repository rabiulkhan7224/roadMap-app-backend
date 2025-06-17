import User from "../models/User"
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const register = async (req:Request, res:Response) =>{
    const { name, email, password } = req.body
    try {
        const existingUser= await User.findOne({email})
        if(existingUser){
             res.status(400).json({message:"User already exists"})
             return;
        }
const hashedPassword = await bcrypt.hash(password, 10)
        const user= User.create({name, email, password: hashedPassword})
        res.status(201).json({message: "registered successfully", user})
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error , " });}
}