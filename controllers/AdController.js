import AdModel from "../models/AdModel.js";
// import dotenv from "dotenv";

// dotenv.config();
// process.env.MONGODB_COLLECTION
async function getAllAds(req, res) {
    const Ads = await AdModel.find();
    const locals = { Ads };
    console.log(Ads);
    res.render("index", locals);
}

export default { getAllAds };