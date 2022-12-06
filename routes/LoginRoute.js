import express from "express";
import LoginController from "../controllers/LoginController.js";

const LoginRouter = express.Router();

LoginRouter.get("/", LoginController.getLogin);
LoginRouter.get("/logout", LoginController.logout);
LoginRouter.post("/", LoginController.login);

export default LoginRouter;