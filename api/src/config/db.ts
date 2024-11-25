import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoURL = process.env.MONGODB_URL;

  if (!mongoURL) {
    throw new Error('MONGODB_URL is not defined in .env.');
  }

  try {
    await mongoose.connect(mongoURL);
    console.log('Mongoose connected with MongoDB');
  } catch (error) {
    console.error('Erro trying to connect Mongoose with MongoDB: ', error);
    process.exit(1);
  }
};

export default connectDB;
