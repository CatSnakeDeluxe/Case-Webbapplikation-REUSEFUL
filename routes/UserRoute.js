import express from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getLogin);
UserRouter.get("/register", UserController.getRegisterForm);
// UserRouter.post("/login", UserController.createUser);

export default UserRouter;