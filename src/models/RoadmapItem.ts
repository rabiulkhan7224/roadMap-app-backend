import { model, Schema } from "mongoose";

interface IRoadmapItem {
    title: string;
    description: string;
    status: 'Planned' | 'In Progress' | 'Completed';
    category: 'Feature' | 'Bug' | 'Improvement' | 'UI/UX' | 'Performance' | 'Security' | 'Integration' | 'Testing' | 'Documentation' | 'Other';
    createdBy: Schema.Types.ObjectId;
    upvotes: number;
     upvotedBy: string[];
    }

const RoadmapItemSchema = new Schema< IRoadmapItem >({
    title: {type:String, required:true},
    description: {type:String, required:true},
    status: {type:String, enum:['Planned', 'In Progress', 'Completed'], default:'Planned' },
    category:{ type:String, enum:['Feature', 'Bug', 'Improvement', 'UI/UX', 'Performance', 'Security', 'Integration', 'Testing', 'Documentation', 'Other'], default:'Feature' },
    createdBy: {type:Schema.Types.ObjectId, ref:"User", required:true},
    upvotes: {type:Number, default:0},
    upvotedBy:[{ type: String }],
},
{timestamps:true});

export default model("RoadmapItem", RoadmapItemSchema);