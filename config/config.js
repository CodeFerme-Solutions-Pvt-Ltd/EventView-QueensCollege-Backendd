import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }
    
    // Connect explicitly targeting the QueensCollegeData database
    const conn = await mongoose.connect(uri, {
      dbName: 'QueensCollegeData',
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log(`MongoDB Connected: ${conn.connection.host} (Database: QueensCollegeData)`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.log('Server running in offline-database mode. Database actions will report offline status.');
  }
};

export default connectDB;
