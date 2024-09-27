import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //NOTE : you might forget to use await here

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(
      "MogonDB connection Successful",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("ERROR OCCURED AT MONGODB CONNECTION", error.message);
    process.exit(1);
  }
};

export default connectDB;
