import AdModel from "../models/AdModel.js";
// import functions from "../functions/functions.js";

async function getAllAds(req, res) {
  const Ads = await AdModel.find({ visibility: "public" }).populate("postedBy", "username").exec();
  const userId = req.session.userId;
  // Ads.forEach(ad => {
  //   console.log("Ads", Ads.category);
  // });
  // functions.addImg(Ads.category);
 
  const locals = { Ads, userId };

  return res.render("ads", locals);
}

export default { getAllAds };