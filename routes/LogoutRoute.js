import express from "express";
import LogoutController from "../controllers/LogoutController.js";

const LogoutRouter = express.Router();

LogoutRouter.get("/", LogoutController.logout);

export default LogoutRouter;