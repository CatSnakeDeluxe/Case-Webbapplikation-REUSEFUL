import AdModel from "../models/AdModel.js";
import { ObjectId } from "mongodb";

async function getAllAds(req, res) {
  const Ads = await AdModel.find({ visibility: "public" }).populate("postedBy", "username").exec();
  const userId = req.session.userId;
  const locals = { Ads, userId };

  res.render("ads", locals);
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
    res.redirect(`/ads?${query}`);
  }
}

async function getAdForm(req, res) {
  const userId = req.session.userId;
  const locals = { userId };
  res.render("adForm", locals);
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
    res.redirect("/userPage");
  }
}

// async function updateQuote(req, res) {
//   try {
//     // get the id of the request
//     const id = req.params.id;

//     const { name, quote, visibility } = req.body;

//     // validate user input
//     const quoteDoc = new QuoteModel({ name, quote, visibility });
//     await quoteDoc.validate();

//     // find old quote and replace doc from collection
//     await QuoteModel.updateOne(
//       { _id: ObjectId(id) },
//       { name, quote, visibility }
//     );
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     res.redirect("/quotes");
//   }
// }

export default { getAllAds, publishAd, getAdForm, deleteAd };