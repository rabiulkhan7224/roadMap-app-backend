import { Request, Response } from "express";
import RoadmapItem from "../models/RoadmapItem";
import { AuthRequest } from "../middleware/auth";

export const createRoadmapItem = async (req:AuthRequest, res:Response) => {
  
    const { title, description, status, category} = req.body;
    try {
      const newItem = new RoadmapItem({
        title,
        description,
        status,
        category,
        createdBy: req.userId
      });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to create roadmap item", error });
    }
    

};

export const updateRoadmapItem = async (req:Request, res:Response) => {
  const updated = await RoadmapItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteRoadmapItem = async (req:Request, res:Response) => {
  await RoadmapItem.findByIdAndDelete(req.params.id);
  res.status(204).send('Roadmap item deleted');
};