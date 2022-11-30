import { Router } from "express";
import AdController from "../controllers/AdController.js";

const AdRouter = Router();

// function ensureAuth(req,res,next) {
//     console.log("Inside ensureAuth");
//     if (req.session.isAuth) {
//         console.log("User is authenticated. Continue to request");
//         next();
//     } else {
//         console.log("User is NOT authenticated. Redirect to login");
//         const q = (new URLSearchParams({type: "fail", message: "You must login to access content"})).toString();
//         res.redirect(`/login?${q}`)
//     }
// }

// AdRouter.use(ensureAuth);

AdRouter.get("/ads", AdController.getAllAds);
AdRouter.post("/ads", AdController.publishAd);
// AdRouter.put("/ads/:id", AdController);
// AdRouter.delete("/ads/:id", AdController);

export default AdRouter;