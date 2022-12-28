const express = require("express")
const app = express()
const routes = require(process.env.DETA_RUNTIME
  ? "./dist/routes"
  : "./src/routes").default

app.use("/api", routes)

if (process.env.DETA_RUNTIME) module.exports = app
else {
  const port = 4000
  app.listen(port, () => {
    console.log(`Micro is running locally on http://localhost:${port}`)
  })
}
