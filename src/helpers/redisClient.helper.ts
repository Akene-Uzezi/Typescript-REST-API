import Redis from "redis";
const redisClient = Redis.createClient();
redisClient.on("error", (err) => console.error("Redis error", err));
redisClient
  .connect()
  .then(() => console.log("connected to redis"))
  .catch((err) => console.log(err));

export default redisClient;
