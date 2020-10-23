import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

export default mongoose.model('accounts', Schema)