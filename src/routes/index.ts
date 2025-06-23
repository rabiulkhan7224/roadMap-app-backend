import express from 'express';
import { createRoadmapItem, deleteRoadmapItem, updateRoadmapItem } from '../controller/adminRoadmap.controller';
import { getUserProfile, login, logout, register } from '../controller/authController';
import { createComment, deleteComment, getComments, updateComment } from '../controller/commentController';
import { getRoadmapItem, getRoadmapItems, toggleUpvote } from '../controller/roadmapController';
import { authMiddleware } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const router = express.Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
// /me
router.get('/auth/me', authMiddleware, getUserProfile)
router.post('/auth/mes', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Roadmap
router.get('/roadmap', getRoadmapItems);
router.get('/roadmap/:id', getRoadmapItem); // Assuming this is to get a specific roadmap item
router.patch('/roadmap/:id/upvote', authMiddleware, toggleUpvote);

// Comments
router.get('/comments/:roadmapId', getComments);
router.post('/comments/:roadmapId', authMiddleware, createComment);
router.patch('/comments/:commentId', authMiddleware, updateComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);
// Admin routes
router.post('/admin/roadmap', authMiddleware, isAdmin, createRoadmapItem);
router.patch('/admin/roadmap/:id',authMiddleware, isAdmin, updateRoadmapItem);      
router.delete('/admin/roadmap/:id',authMiddleware, isAdmin, deleteRoadmapItem);