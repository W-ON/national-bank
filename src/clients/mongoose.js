import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
}) 

import mongoose from 'mongoose'

const connectMongoose = () => mongoose.connect(`mongodb://${process.env.DB_HOST}}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
})

const closeMongoose = () => mongoose.connection.close();

export default { connectMongoose, closeMongoose }