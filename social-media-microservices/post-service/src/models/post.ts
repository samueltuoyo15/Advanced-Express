import mongoose, { Document } from "mongoose"

interface IPost extends Document {
  user: mongoose.Schema.Types.ObjectId
  content: string
  media_ids?: string[]
  created_at: Date
}

const postSchema = new mongoose.Schema<IPost>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    media_ids: [{
        type: String, 
    }],
    created_at: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

postSchema.index({ content: "text" })

const Post = mongoose.model<IPost>("Post", postSchema)

export default Post