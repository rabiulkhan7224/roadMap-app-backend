import express from 'express';
import { login, logout, register } from '../controller/authController';
import { getRoadmapItems, upvoteRoadmap } from '../controller/roadmapController';
import { authMiddleware } from '../middleware/auth';
import { createComment, deleteComment, getComments, updateComment } from '../controller/commentController';
import { createRoadmapItem, deleteRoadmapItem, updateRoadmapItem } from '../controller/adminRoadmap.controller';

export const router = express.Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

// Roadmap
router.get('/roadmap', getRoadmapItems);
router.patch('/roadmap/:id/upvote', authMiddleware, upvoteRoadmap);

// Comments
router.get('/comments/:roadmapId', getComments);
router.post('/comments/:roadmapId', authMiddleware, createComment);
router.patch('/comments/:commentId', authMiddleware, updateComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);
// Admin routes
router.post('/admin/roadmap', createRoadmapItem);
router.patch('/admin/roadmap/:id', updateRoadmapItem);      
router.delete('/admin/roadmap/:id', deleteRoadmapItem);