import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose
      .set("strictQuery", true)
      .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log("Successfully connected to database");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
