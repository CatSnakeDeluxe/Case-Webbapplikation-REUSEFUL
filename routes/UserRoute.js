import express from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = express.Router();

// LOGIN
UserRouter.get("/", UserController.getLogin);
UserRouter.post("/", UserController.login);

// REGISTER
UserRouter.get("/register", UserController.getRegisterForm);
UserRouter.post("/register", UserController.registerUser);

export default UserRouter;