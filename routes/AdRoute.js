import { Router } from "express";
import AdController from "../controllers/AdController.js";

const AdRouter = Router();

AdRouter.get("/ads", AdController.getAllAds);

// MOVE ROUTES TO USERROUTE?
// AdRouter.get("/adForm", AdController.getAdForm);
// AdRouter.post("/ads", AdController.publishAd);
// AdRouter.delete("/:id", AdController.deleteAd);
// AdRouter.put("/:id", AdController.updateAd);

export default AdRouter;