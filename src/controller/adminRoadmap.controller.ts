import { Request, Response } from "express";
import RoadmapItem from "../models/RoadmapItem";

export const createRoadmapItem = async (req:Request, res:Response) => {
  const { title, description, status, category } = req.body;
  const roadmap = await RoadmapItem.create({ title, description, status, category });
  res.status(201).json(roadmap);
};

export const updateRoadmapItem = async (req:Request, res:Response) => {
  const updated = await RoadmapItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteRoadmapItem = async (req:Request, res:Response) => {
  await RoadmapItem.findByIdAndDelete(req.params.id);
  res.status(204).send('Roadmap item deleted');
};