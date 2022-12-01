import express from "express";
import RegisterController from "../controllers/RegisterController.js";

const RegisterRouter = express.Router();

RegisterRouter.get("/", RegisterController.getRegisterForm);
RegisterRouter.post("/", RegisterController.registerUser);

export default RegisterRouter;