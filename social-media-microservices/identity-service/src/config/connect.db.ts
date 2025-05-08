import mongoose from "mongoose"
import logger from "@/utils/logger"

const connectToDb = async () => {
  try{
    await mongoose.connect(process.env.MONGOOSE_URL!)
    logger.info("Connected to MongoDb")
  }catch(error){
    logger.error("Failed to connect to mongodb", error)
    process.exit(1)
  }
}

export default connectToDb