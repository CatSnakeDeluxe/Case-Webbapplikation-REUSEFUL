import mongoose from "mongoose";

const LoginSchema = {
    username: {
      type: String,
      required: "must be filled in",
      minLength: 3, maxLength: 20
    },
    password: {
      type: String,
      required: "must be filled in",
      minLength: 3, maxLength: 60
    },
  };
  
  const LoginModel = mongoose.model("Login", LoginSchema);
  
  export default LoginModel;