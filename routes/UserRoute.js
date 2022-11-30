import express from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getLogin);
UserRouter.get("/register", UserController.getRegisterForm);

UserRouter.post("/register", UserController.registerUser);
UserRouter.post("/", UserController.logForm);

export default UserRouter;