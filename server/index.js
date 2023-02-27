import express from 'express'
import mongoose from 'mongoose'
import authRouter from './authRouter.js'
import cors from 'cors'
import { DEF } from './default.js'

const app = express()

app.use(
  cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
)
app.use(express.json())
app.use('/api', authRouter)
async function startApp() {
  try {
    await mongoose.connect(DEF.DB_URL)
    app.listen(DEF.PORT, () => console.log(`server start on ${DEF.PORT}`))
  } catch (e) {
    console.log(e)
  }
}
startApp()
