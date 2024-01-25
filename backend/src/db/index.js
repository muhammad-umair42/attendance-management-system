import mongoose from 'mongoose';

//DataBase Connection.
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`,
    );

    console.log('\nMongoDB connected: ', connectionInstance.connection.host);
  } catch (error) {
    console.log('\nMongoDB connection Error: \n', error);
    process.exit(1);
  }
};
