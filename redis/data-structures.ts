import { createClient } from "redis"

const client = createClient({
  socket:{
  host: "localhost",
  port: 6379,
  }
})

client.on("error", (error) => console.error("Redis Client Error Occured!", error))

//function to test redis connection 

const redisDataStructure = async () => {
  try{
    await client.connect()
    console.log("Redis Client Connected")
    
    await client.set("user:name", "Golang Dev")
    const name = await client.get("user:name")
    console.log(name)
    
    // set multiple key value pairs 
    await client.mSet(["user:country", "united states", "user:age", "50", "user:email", "test@gmail.com"])
    const [country, age, email] = await client.mGet(["user:country", "user:age", "user:email"])
    console.log(country, age, email)
 
  } catch(error){
    console.error(error)
  } finally {
    // to quit instantly and to make sure clients does not leave any open connections
    await client.quit()
  }
}

redisDataStructure()