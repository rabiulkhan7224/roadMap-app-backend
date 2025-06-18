import { Request, Response } from "express";
import { Comment } from "../models/Comment";


export const createComment = async (req: Request, res: Response) => {
  const { content, parentCommentId } = req.body;
  const roadmapItemId = req.params.roadmapId;

  let level = 0;
  if (parentCommentId) {
    const parent = await Comment.findById(parentCommentId);
    if (!parent) return res.status(400).json({ message: 'Parent not found' });
    if (parent.level >= 2) return res.status(400).json({ message: 'Max nesting level reached' });
    level = parent.level + 1;
  }}


  export const getComments = async (req: Request, res: Response) => {
  const roadmapItemId = req.params.roadmapId;
  const comments = await Comment.find({ roadmapItemId }).sort({ createdAt: 1 });
  res.json(comments);
}
export const updateComment = async (req: AuthRequest, res: Response) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment || comment.userId.toString() !== req.userId)
    return res.status(403).json({ message: 'Unauthorized' });

  comment.content = req.body.content;
  await comment.save();
  res.json(comment);
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment || comment.userId.toString() !== req.userId)
    return res.status(403).json({ message: 'Unauthorized' });

  await comment.deleteOne();
  res.json({ message: 'Deleted' });
};