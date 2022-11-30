import AdModel from "../models/AdModel.js";

async function getAllAds(req, res) {
    // const publicAds = await AdModel.find({visibility: 'public'}).populate("postedBy", "username").exec();
    // const {userId} = req.session;
    // const UserAds await AdModel.find({postedBy: ObjectId(userId)});
    
    const Ads = await AdModel.find();
    const locals = { Ads };
    console.log(Ads);
    res.render("index", locals);
}

export default { getAllAds };