import mongoose from "mongoose";
import dotenv from "dotenv";
import { exit } from "process";

dotenv.config();

// check if connection string is valid
if (!process.env.MONGO_CONNECTION_STR) {
  console.error("MONGO_CONNECTION_STR is not defined in .env file");
  exit();
}

// // database connection
const url = process.env.MONGO_CONNECTION_STR;
mongoose.connect(url) ? console.log("Connected") : console.log("Connection Failed");

// ad schema 
const AdSchema = new mongoose.Schema( {
  title: {
    type: String,
    required: "must be filled in",
  },
  category: {
    type: String,
    required: "must be filled in",
  },
  price: {
    type: Number,
    required: "must be filled in",
  },
  // img:
  // {
  //     data: Buffer,
  //     contentType: String
  // },
  description: {
    type: String,
    required: "must be filled in",
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  },
  // refer to collection for user
  postedBy: {
    type: mongoose.Schema.ObjectId, 
    ref: "Users"
  }
}, { collection: "Ads" });

const AdModel = mongoose.model("Ads", AdSchema);

export default AdModel;