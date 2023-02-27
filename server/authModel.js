import mongoose from 'mongoose'

const authModel = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

export default mongoose.model('registration', authModel)
