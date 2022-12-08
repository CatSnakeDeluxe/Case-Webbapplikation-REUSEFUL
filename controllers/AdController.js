import AdModel from "../models/AdModel.js";
// import functions from "../functions/functions.js";

async function getAllAds(req, res) {
  const Ads = await AdModel.find({ visibility: "public" }).populate("postedBy", "username").exec();
  const userId = req.session.userId;
  const locals = { Ads, userId, serverMessage: req.query };

  return res.render("ads", locals);
}

export default { getAllAds };