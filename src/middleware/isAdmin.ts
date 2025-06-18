import { NextFunction, Request, Response } from "express";

export interface adminReq extends Request {
    user?: {
        isAdmin: boolean;
    };
}

export const isAdmin = (req:adminReq, res:Response, next:NextFunction) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
}