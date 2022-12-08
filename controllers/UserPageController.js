import AdModel from "../models/AdModel.js";
import { ObjectId } from "mongodb";

async function getUserAds(req, res) {
    const userId = req.session.userId;
    const UserAds = await AdModel.find({ postedBy: ObjectId(userId) });
    console.log("USER ID", userId);
    const locals = { UserAds, userId, serverMessage: req.query };

    res.render("userPage", locals);
}

async function publishAd(req, res) {
    let query = null;
    try {
      const { title, category, price, description, visibility } = req.body;
  
      const postedBy = ObjectId(req.session.userId);
  
      const newAdDocument = new AdModel({ title, category, price, description, visibility, postedBy });
  
      newAdDocument.save();
    } catch (err) {
      query = new URLSearchParams({ type: "fail", message: err.message });
      console.error(err.message);
      return res.redirect(`/adForm?${query}`);
    } finally {
      query = new URLSearchParams({ type: "success", message: "Successfully Created Ad" });
      res.redirect(`/userPage?${query}`);
    }
  }
  
  async function getAdForm(req, res) {
    const userId = req.session.userId;
    const locals = { userId };
    res.render("adForm", locals);
  }

  async function deleteAd(req, res) {
    let query = null;
    try {
      const ID = req.params.id;
      console.log("Trying to delete: ", ID);

      const result = await AdModel.deleteOne({ _id: ID });

      if (result.deletedCount == 0) {
        throw { message: "No Ad deletion was made" };
      }
    } catch (err) {
      query = new URLSearchParams({ type: "fail", message: err.message });
      return res.redirect(`/userPage?${query}`);
    } finally {
      // ADD QUERYS
      query = new URLSearchParams({ type: "success", message: "Succesfully Deleted Ad" });
      res.redirect(`/userPage?${query}`);
    }
  }
  
  async function updateAd(req, res) {
    let query = null;
    try {
      // get the id of the request
      const id = req.params.id;
      const { title, category, price, description, visibility } = req.body;
      // validate user input
      // const quoteDoc = new AdModel({ title, category, price, description, visibility });
      // await quoteDoc.validate();
      await AdModel.updateOne(
        { _id: ObjectId(id) }, { title, category, price, description, visibility });
    } catch (err) {
      query = new URLSearchParams({ type: "fail", message: err.message });
      return res.redirect(`/userPage?${query}`);
    } finally {
      query = new URLSearchParams({ type: "success", message: "Succesfully Updated Ad" });
      res.redirect(`/userPage?${query}`);
    }
  }

export default { getUserAds, publishAd, getAdForm, deleteAd, updateAd };