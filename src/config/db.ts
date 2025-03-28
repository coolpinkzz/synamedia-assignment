import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://masterpratikyadav:Pratik4897@syna.7vh9psi.mongodb.net/?retryWrites=true&w=majority&appName=syna";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      //  useNewUrlParser: true,
      //  useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Exit process with failure
  }
};
