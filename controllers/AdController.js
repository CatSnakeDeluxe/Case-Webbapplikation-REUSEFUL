import AdModel from "../models/AdModel.js";
import { ObjectId } from "mongodb";

async function getAllAds(req, res) {
    // const publicAds = await AdModel.find({ visibility: "public" }).populate("postedBy", "username").exec();
    const Ads = await AdModel.find({ visibility: "public" }).populate("postedBy", "username").exec();
    const userId = req.session.userId;
    const locals = { Ads, userId };

    res.render("ads", locals);
}

async function publishAd(req, res) {
    let query = null;
  
    try {
        // collect data from body
        const { title, category, price, description, visibility } = req.body;
    
        const postedBy = ObjectId(req.session.userId);
    
        // create Quote document instance locally
        const newAdDocument = new AdModel({ title, category, price, description, visibility, postedBy });
        
        // save to database
        newAdDocument.save();
    } catch (err) {
        query = new URLSearchParams({type: "fail", message: err.message});
        console.error(err.message);
        return res.redirect(`/adForm?${query}`);
    } finally {
        query = new URLSearchParams({type: "success", message: "Successfully Created Ad"});
        res.redirect(`/ads?${query}`);
    }
  }

  async function getAdForm(req, res) {
    const userId = req.session.userId;
    const locals = { userId };
    res.render("adForm", locals);
  }

export default { getAllAds, publishAd, getAdForm };