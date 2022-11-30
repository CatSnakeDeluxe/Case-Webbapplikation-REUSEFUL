import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = Router();

UserRouter.get("/login", UserController.getLogin);
UserRouter.post("/login", UserController.login);

export default UserRouter;