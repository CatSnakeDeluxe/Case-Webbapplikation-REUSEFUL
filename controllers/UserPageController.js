import AdModel from "../models/AdModel.js";
import { ObjectId } from "mongodb";

async function getUserAds(req, res) {
    const userId = req.session.userId;
    const UserAds = await AdModel.find({ postedBy: ObjectId(userId) });
    console.log("USER ID", userId);
    const locals = { UserAds, userId };

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

  async function getEditForm(req, res) {
    const userId = req.session.userId;
    const locals = { userId };
    res.render("editForm", locals);
  }
  
  async function deleteAd(req, res) {
    try {
      // get id from params /userPage/<this-part>
      const ID = req.params.id;
      console.log("Trying to delete: ", ID);
  
      // get result from deletion
      const result = await AdModel.deleteOne({ _id: ID });
  
      // make sure there was a deletion otherwise raise exception
      if (result.deletedCount == 0) {
        throw { message: "No Ad deletion was made" };
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      // ADD QUERYS
      res.redirect("/userPage");
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

export default { getUserAds, publishAd, getAdForm, deleteAd, updateAd, getEditForm };