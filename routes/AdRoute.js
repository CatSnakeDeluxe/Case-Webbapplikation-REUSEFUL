import { Router } from "express";
import AdController from "../controllers/AdController.js";

const AdRouter = Router();

AdRouter.get("/", AdController);
AdRouter.put("/ads/:id", AdController);
AdRouter.post("/ads", AdController);
AdRouter.delete("/ads/:id", AdController);

export default AdRouter;