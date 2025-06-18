import { Request, Response } from "express";
import RoadmapItem from "../models/RoadmapItem";
import { AuthRequest } from "../middleware/auth";
import mongoose from "mongoose";

export const getRoadmapItems = async (req: Request, res: Response) => {
    const { status, sort } = req.query
    try {
        const query: Record<string, any> = {}
        if (status) {
            query.status = status
        }
        const items = await RoadmapItem.find(query).sort({ createdAt: sort === 'asc' ? 1 : -1 })
        res.status(200).json(items)
    } catch (error) {
        console.error("Error fetching roadmap items:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}


export const upvoteRoadmap = async (req: AuthRequest, res: Response) => {
    const roadmap = await RoadmapItem.findById(req.params.id)
    if (!roadmap) {
        res.status(404).json({ message: 'not found' })
        return;}
    if (roadmap.upvotedBy.includes(new mongoose.Types.ObjectId(req.userId!))) {
        res.status(400).json({ message: 'already upvoted' })
        return;
    }
    roadmap.upvotedBy.push(new mongoose.Types.ObjectId(req.userId!))
    roadmap.upvotes += 1
    await roadmap.save()
    res.json(roadmap)
}