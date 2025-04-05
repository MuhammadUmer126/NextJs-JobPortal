import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://sa:123@cluster0.ugreh.mongodb.net/NextDb"
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
