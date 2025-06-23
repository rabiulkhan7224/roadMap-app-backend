import { Request, Response } from "express";
import RoadmapItem from "../models/RoadmapItem";
import { AuthRequest } from "../middleware/auth";

export const createRoadmapItem = async (req:AuthRequest, res:Response) => {
  
    const { title, description, status } = req.body;
    const Item = RoadmapItem.create({
        title,
        description,
        status,
        createdBy: req.userId, 
    });
    res.status(201).json({ message: 'Roadmap item created successfully' });

};

export const updateRoadmapItem = async (req:Request, res:Response) => {
  const updated = await RoadmapItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteRoadmapItem = async (req:Request, res:Response) => {
  await RoadmapItem.findByIdAndDelete(req.params.id);
  res.status(204).send('Roadmap item deleted');
};