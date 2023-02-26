import express from 'express'
import mongoose from 'mongoose'
import authRouter from './authRouter.js'
const PORT = process.env.PORT || 5050
const DB_URL =
  'mongodb+srv://bvorush:LHx2WZbsq5eR3pte@dryg-db.9vnajxg.mongodb.net/?retryWrites=true&w=majority'
const app = express()

app.use(express.json())
app.use('/api', authRouter)
async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`server start on ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
startApp()
