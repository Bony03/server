import mongoose from 'mongoose'

const authModel = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
})

export default mongoose.model('registration', authModel)
