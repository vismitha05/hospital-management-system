import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Force IPv4 connection
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/hospital-management');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
