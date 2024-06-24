import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};
