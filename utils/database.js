import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MONDODB ALREADY CONNECTED');
    return;
  }

  console.log("🚀 ~ connectToDB ~ process.env.MONGODB_URI:", process.env.MONGODB_URI)
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'promptopia'
    });
    isConnected = true;
    console.log('MONGODB CONNECTED');
  } catch (error) {
    console.error('MONGODB CONNECTION ERROR', error);
  }
}