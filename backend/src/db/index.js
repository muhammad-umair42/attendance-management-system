import mongoose from 'mongoose';

//DataBase Connection.
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      'mongodb+srv://umair42:Riamu456.@cluster0.ceckkpa.mongodb.net/AMS',
    );

    console.log('\nMongoDB connected: ', connectionInstance.connection.host);
  } catch (error) {
    console.log('\nMongoDB connection Error: \n', error);
    process.exit(1);
  }
};
