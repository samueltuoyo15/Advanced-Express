import Post from "@/models/post"
import logger from "@/utils/logger"
import { Request, Response } from "express"

const createPost = async (req: Request, res: Response ): Promise<any> => {
    logger.info("Create post has started...")
    
    try {
        const { content, media_ids } = req.body
        if(!content || !media_ids) {
            return res.status(400).json({ success: false, message: "All fields are required"})
        }

        const { userId } = req?.user

        const newPost = await Post.create({
            user: userId,
            content,
            media_ids: media_ids || []
        })
        logger.info("Post created succesfully")
        return res.status(200).json({ success: true, message: "Post created successfully"})
    } catch (error){
        logger.error("Failed to create post", error)
        res.status(500).json({ success: false, message: "Failed to create post"})
    }
}

const getAllPosts = async (req: Request, res: Response ): Promise<any> => {
    logger.info("Get All post has started...")
    
    try {

    } catch (error){
        logger.error("Failed to get all post", error)
        return res.status(500).json({ success: false, message: "Failed to get all post"})
    }
}

const getPost = async (req: Request, res: Response ): Promise<any> => {
    logger.info("Get post has started...")
    
    try {

    } catch (error){
        logger.error("Failed to fetch post", error)
        return res.status(500).json({ success: false, message: "Failed to fetch post"})
    }
}

const deletePost = async (req: Request, res: Response ): Promise<any> => {
    logger.info("Delete post has started...")
    
    try {

    } catch (error){
        logger.error("Failed to delete post", error)
        return res.status(500).json({ success: false, message: "Failed to delete post"})
    }
}