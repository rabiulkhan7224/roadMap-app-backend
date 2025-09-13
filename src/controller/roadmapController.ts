import { Request, Response } from "express";
import RoadmapItem from "../models/RoadmapItem";
import { AuthRequest } from "../middleware/auth";
import mongoose, { Schema } from "mongoose";

export const getRoadmapItems = async (req: Request, res: Response) => {
    const { status, sort , search} = req.query
    try {
       
        const query: Record<string, any> = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            // If you want to search by title and description, you can use:
            query.$or = [
                { title: { $regex: search as string, $options: 'i' } },
                { description: { $regex: search as string, $options: 'i' } }
            ];
        }
        const totalComments= { $size: "$comments" };
        const totalUpvotes = { $size: "$upvotedBy" };
    

        const items = await RoadmapItem.find(query).sort({ createdAt: sort === 'recent' ? -1 : 1 });
              

        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching roadmap items:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}


// export const upvoteRoadmap = async (req: AuthRequest, res: Response) => {
//     const roadmap = await RoadmapItem.findById(req.params.id)
//     if (!roadmap) {
//         res.status(404).json({ message: 'not found' })
//         return;
//     }
//     if (roadmap.upvotedBy.includes(new mongoose.Types.ObjectId(req.userId!))) {
//         res.status(400).json({ message: 'already upvoted' })
//         return;
//     }
//     roadmap.upvotedBy.push(new Schema.Types.ObjectId(req.userId!))
//     roadmap.upvotes += 1
//     await roadmap.save()
//     res.json(roadmap)
// }


export const toggleUpvote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }

    const item = await RoadmapItem.findById(id);
    if (!item) {
       res.status(404).json({ message: "Roadmap item not found" });
         return;
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const index = item.upvotedBy.findIndex(
      (uid) => uid.toString() === userObjectId.toString()
    );

    if (index !== -1) {
      item.upvotedBy.splice(index, 1); // Remove upvote
    } else {
      item.upvotedBy.push(userObjectId.toString()); // Add upvote as string
    }

    await item.save();
    res.json({
      upvotes: item.upvotedBy.length,
      upvoted: item.upvotedBy.includes(userObjectId.toString())
    });
  } catch (error) {
    console.error("Upvote Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// // GET /api/roadmap?search=dark&sortBy=votes
// export const getRoadmaps = async (req: Request, res: Response) => {
//   try {
//     const { search = '', sortBy = 'votes' } = req.query;

//     const query: any = {
//       $or: [
//         { title: { $regex: search as string, $options: 'i' } },
//         { category: { $regex: search as string, $options: 'i' } }
//       ]
//     };

//     let sort: any = {};
//     if (sortBy === 'votes') {
//       sort.votes = -1;
//     } else if (sortBy === 'recent') {
//       sort.createdAt = -1;
//     }

//     const roadmaps = await Roadmap.find(query).sort(sort);
//     res.status(200).json(roadmaps);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch roadmaps' });
//   }
// };


// // GET /api/roadmap/:id
export const getRoadmapItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const item = await RoadmapItem.findById(id);
        if (!item) {
             res.status(404).json({ message: "Roadmap item not found" });
                return;
        }
        res.status(200).json(item);
    } catch (error) {
        console.error("Error fetching roadmap item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// // GET /api/roadmap?search=dark&sortBy=votes status  and totalcomments , totalupvotes 
export const getRoadmapItemsWithStats = async (req: Request, res: Response) => {
    const { status, sort ,search } = req.query;
    try {
        const query: Record<string, any> = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            // If you want to search by title and description, you can use:
            query.$or = [
                { title: { $regex: search as string, $options: 'i' } },
                { description: { $regex: search as string, $options: 'i' } }
            ];
            
            
        }

        const items = await RoadmapItem.aggregate([
            { $match: query },
            {
                $project: {
                    title: 1,
                    description: 1,
                    status: 1,
                    upvotes: { $size: "$upvotedBy" },
                    totalComments: { $size: "$comments" },
                    createdAt: 1
                }
            },
            { $sort: { createdAt: sort === 'recent' ? 1 : -1 } }
        ]);
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching roadmap items with stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// get for this api 
// GET /api/roadmap?status=planned&sort=asc?search=dark
