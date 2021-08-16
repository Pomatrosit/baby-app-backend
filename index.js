import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/auth.routes.js"
dotenv.config()
const app = express()

const PORT = process.env.PORT || 7000

app.use(express.json())
app.use(cors())

app.use("/auth", authRouter)

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port: ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
