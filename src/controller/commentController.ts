import { Request, Response } from "express";
import { Comment } from "../models/Comment";
import { AuthRequest } from "../middleware/auth";


export const createComment = async (req: AuthRequest, res: Response) => {
    const { content, parentCommentId } = req.body;
    const roadmapItemId = req.params.roadmapId;

    let level = 0;
    if (parentCommentId) {
        const parent = await Comment.findById(parentCommentId);
        if (!parent) {
            res.status(400).json({ message: 'Parent not found' });
            return;
        }
        if (parent.level >= 2) {
            res.status(400).json({ message: 'Max nesting level reached' });
            return;
        }
        level = parent.level + 1;
    }
}


export const getComments = async (req: Request, res: Response) => {
    const roadmapItemId = req.params.roadmapId;
    const comments = await Comment.find({ roadmapItemId }).sort({ createdAt: 1 });
    res.json(comments);
}
export const updateComment = async (req: AuthRequest, res: Response) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.userId.toString() !== req.userId) {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }
    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.userId.toString() !== req.userId){
        res.status(403).json({ message: 'Unauthorized' });
    return; }

    await comment.deleteOne();
    res.json({ message: 'Deleted' });
};