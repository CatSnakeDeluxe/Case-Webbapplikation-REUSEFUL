import AdModel from "../models/AdModel.js";

async function getAllAds(req, res) {
    const Ads = await AdModel.find();
    console.log(Ads);
    const locals = { Ads };
    res.render("index", locals);
}

export default { getAllAds };