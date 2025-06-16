import { model, Schema } from "mongoose";

const RoadmapItemSchema = new Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    status: {type:String, enum:['Planned', 'In Progress', 'Completed'], default:'Planned' },
    upvotes: {type:Number, default:0},
    upvotedBy:[{type:Schema.Types.ObjectId, ref:"User"}],
},{timestamps:true});

export default model("RoadmapItem", RoadmapItemSchema);