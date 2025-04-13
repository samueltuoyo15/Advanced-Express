import { createClient } from "redis"

const client = createClient({
  socket:{
  host: "localhost",
  port: 6379,
  }
})

client.on("error", (error) => console.error("Redis Client Error Occured!", error))

//function to test redis connection 

const testRedisConnection = async () => {
  try{
    await client.connect()
    console.log("Redis Client Connected")
    
    // set a key
    await client.set("name", "Golang Dev")
    
    // get a key
    const username = await client.get("name")
    console.log(`Username is ${username}`)
   
   // numerical count of a key that was deleted 
    const deleteCount = await client.del("name")
    console.log(deleteCount)
    
    await client.set("score", "100")
   
   // inctrement score
    const incrementScore = await client.incr("score")
    console.log(incrementScore)
  
   // decrement score
    const decrementScore = await client.decr("score")
    console.log(decrementScore)
    
  } catch(error){
    console.error(error)
  } finally {
    // to quit instantly and to make sure clients does not leave any open connections
    await client.quit()
  }
}
testRedisConnection()