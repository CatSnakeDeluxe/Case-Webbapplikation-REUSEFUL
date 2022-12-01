import mongoose from "mongoose";
import dotenv from "dotenv";
import { exit } from "process";
import bcrypt from "bcrypt";

// read from .env file and add to process.env
dotenv.config();

// exit program if no connection string
if (!process.env.MONGO_CONNECTION_STR) {
  console.error("MONGO_CONNECTION_STR is not defined in .env file");
  exit();
}

// connect to database
const uri = process.env.MONGO_CONNECTION_STR;
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "username must be filled in",
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, "is invalid"]
    },
    email: {
        type: String,
        required: "email must be filled in",
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: "password must be filled in",
        minLength: 4,
        maxLength: 36
    },
}, { collection: "Users" });

userSchema.pre("save", function (next) {
    try {   
        if (!this.isModified("password")) {
            return next();
        }

        // hash password
        this.password = bcrypt.hashSync(this.password, 10);
        
        // after hashing continue with save()
        next();
    } catch (err) {
        throw new Error("Inccorect password", err);
    }
}, { collection: "Users" });

userSchema.methods.comparePassword = async function (inputPassword, hashedPassword) {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (err) {
        throw new Error("Incorrect password", err);
    }
}

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;