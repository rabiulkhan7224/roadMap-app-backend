import User from "../models/User"
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "User already exists" })
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = User.create({ name, email, password: hashedPassword })
        res.status(201).json({ message: "registered successfully", user })
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error , " });
    }
}
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        }).json({ message: 'Logged in' });
    }
    catch (error) {
        console.error("Error during login:", error)
        res.status(500).json({ message: "Internal server error" })
    }

}
export const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged out' });
}
