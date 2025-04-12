import { Router } from "express"
import { asyncHandler, APIError } from "../middlewares/errorHandler.ts"
const router = Router()

const items = [
  {
    id: 1,
    name: "Juice"
  },
  {
    id: 2,
    name: "Mac Book Pro"
  },
  {
    id: 3,
    name: "Chicken"
  },
  {
    id: 4,
    name: "Stew"
  },
  {
    id: 5,
    name: "Rice"
  }
]

router.post("/items", asyncHandler(async (req, res) => {
  const { itemName } = req.body
  if(!itemName){
    throw new APIError("Item Name is required", 400)
  }
  
  const newItem = {
    id: items.length + 1,
    name: itemName
  }
  items.push(newItem)
  res.status(201).json(newItem)
}))
router.get("/items", asyncHandler(async (req, res) => {
  res.status(200).json(items)
}))

export default router 