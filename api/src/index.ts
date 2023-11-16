import dotenv from "dotenv"
import express from "express"
import router from "./routes"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use("/api", router)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
