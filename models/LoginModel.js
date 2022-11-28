import mongoose from "mongoose";

const LoginSchema = {
    username: {
      type: String,
      required: "must be filled in",
      min: 3, max: 20
    },
    password: {
      type: String,
      required: "must be filled in",
      min: 3, max: 60
    },
  };
  
  const LoginModel = mongoose.model("Login", LoginSchema);
  
  export default LoginModel;