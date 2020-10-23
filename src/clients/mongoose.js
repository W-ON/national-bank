import mongoose from 'mongoose'

const connectMongoose = () => mongoose.connect(`mongodb://localhost:27017/bank`,{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})

export default connectMongoose