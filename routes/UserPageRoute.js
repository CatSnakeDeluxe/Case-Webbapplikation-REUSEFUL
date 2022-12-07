import express from "express";
import UserPageController from "../controllers/UserPageController.js";

const UserPageRouter = express.Router();

function ensureAuth(req,res,next) {
    console.log("Inside ensureAuth");
    if (req.session.checkUserAuth) {
        console.log("User is authenticated. Continue to request");
        next();
    } else {
        console.log("User is NOT authenticated. Redirect to login");
        const query = (new URLSearchParams({type: "fail", message: "You must login to access content"})).toString();
        res.redirect(`/login?${query}`);
    }
}

UserPageRouter.use(ensureAuth);

UserPageRouter.get("/", UserPageController.getUserAds);
// UserPageRouter.get("/editForm", UserPageController.getEditForm);
UserPageRouter.get("/adForm", UserPageController.getAdForm);

UserPageRouter.post("/", UserPageController.publishAd);
UserPageRouter.delete("/:id", UserPageController.deleteAd);
// UserPageRouter.put("/editForm/:id", UserPageController.updateAd);

export default UserPageRouter;