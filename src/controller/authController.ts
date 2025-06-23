import User from "../models/User"
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "User already exists" })
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
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
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' })
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid password' })
            return;
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, }, process.env.JWT_SECRET!, { expiresIn: '7d' })
        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'none', 
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({ message: 'Logged in' });
    }
    catch (error) {
        console.error("Error during login:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const logout = (req: Request, res: Response) => {
    res.clearCookie('token').json({ message: 'Logged out' });
}

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}