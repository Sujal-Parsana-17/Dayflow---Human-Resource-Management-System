import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI =
      "mongodb+srv://meetjaka46:meet6782@hrms.fxscnuo.mongodb.net/?appName=hrms" ||
      "mongodb://127.0.0.1:27017/hrms_dayflow";

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB Disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB Error: ${err.message}`);
});

export default connectDB;
