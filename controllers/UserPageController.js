import AdModel from "../models/AdModel.js";
import { ObjectId } from "mongodb";

async function getUserAds(req, res) {
    const userId = req.session.userId;
    const UserAds = await AdModel.find({ postedBy: ObjectId(userId) });
    console.log("USER ID", userId);
    const locals = { UserAds, userId };

    res.render("userPage", locals);
}

// async function getEditForm(req, res) {
//     const userId = req.session.userId;
//     const locals = { userId };
//     res.render("editForm", locals);
// }

export default { getUserAds };