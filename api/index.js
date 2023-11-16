const express = require("express")
const app = express()
const port = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 4000
const routes = require(process.env.ENVIRONMENT
  ? "./dist/routes"
  : "./src/routes").default

app.use("/api", routes)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
