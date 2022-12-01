import express from "express";
import LoginController from "../controllers/LoginController.js";

const LoginRouter = express.Router();

LoginRouter.get("/", LoginController.getLogin);
LoginRouter.post("/", LoginController.login);

export default LoginRouter;