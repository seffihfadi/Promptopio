import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery')
  if (isConnected) {
    console.log('MongoDB is Already Connected')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI , {
      dbName: 'promptopio',
      //useNewUrlParcer: true,
      useUnifiedTopology: true
    })
    isConnected = true
    console.log('MongoDB Connected')

  } catch (err) {
    console.log('DB error Happend', err)
  }
}