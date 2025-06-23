import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
    };

}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
  
    // why is this not working?
    // const token = req.headers.authorization?.split(' ')[1];

    //   console.log( 'authMiddleware', token);
    if (!token) {
        res.status(401).json({ message: 'Unauthorized user' });
        return;
    }



    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET!) as {
            isAdmin: boolean;
            email: string;
            name: string;
            id: string;
        };
        req.userId = decoded.id;
        req.user = { id: decoded?.id, name: decoded?.name, email: decoded?.email, isAdmin: decoded?.isAdmin };
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};
