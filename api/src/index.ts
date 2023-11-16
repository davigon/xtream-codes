import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import router from "./routes"

dotenv.config()

const app = express()
const port = process.env.PORT
const clientUrl = process.env.CLIENT_URL || "nourl"

app.use(
  cors({
    origin: [clientUrl]
  })
)

app.use("/api", router)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
