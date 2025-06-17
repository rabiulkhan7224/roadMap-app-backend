import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
  roadmapItemId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  parentCommentId?: Types.ObjectId;
  level: number;
}

const CommentSchema = new Schema<IComment>({
  roadmapItemId: { type: Schema.Types.ObjectId, ref: 'RoadmapItem', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, },
  parentCommentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  level: { type: Number, default: 0 },
}, { timestamps: true });

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
