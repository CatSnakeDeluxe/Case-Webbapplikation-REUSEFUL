import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

async function getLogin(req, res) {
    // res.render("login", { serverMessage: req.query });
    res.render("login");
}

async function getRegisterForm(req, res) {
    res.render("registerForm");
}

async function registerUser(req, res) {
    try {
    // collect data from body
      const { username, email, password } = req.body;

      const newUserDocument = new UserModel({ username, email, password });
      
      // save to database
      newUserDocument.save();

    } catch (error) {
        console.error(err.message);
    } finally {
        res.redirect("/login");
    }
}

async function logForm(req, res) {
    console.log("Form submitted");
    res.redirect("login");
}

// async function publishAd(req, res) {
//     // let query = null;
  
//     try {
//       // collect data from body
//       const { title, category, price, description, visibility } = req.body;
  
//     //   const postedBy = ObjectId(req.session.userId);
  
//       // create Quote document instance locally
//       const newAdDocument = new AdModel({ title, category, price, description, visibility });
      
//       // save to database
//       newAdDocument.save();
  
//     // create message that operation was successfull
//     //   query = new URLSearchParams({type: "success", message: "Successfully created quote!"});
//     } catch (err) {
//       // create message that operation was unsuccessfull
//     //   query = new URLSearchParams({type: "fail", message: err.message});
//       console.error(err.message);
//     } finally {
//     //   const queryStr = query.toString();
//     //   res.redirect(`/quotes?${queryStr}`);
//     res.redirect("/ads");
//     }
//   }

//   async function getAdForm(req, res) {
//     res.render("adForm");
//   }

// async function login(req, res) {
//     try {
//         // collect data from body
//         const {username, password} = req.body;

//         // find user
//         const user = await UserModel.findOne({username});

//         if (!user) {
//             throw new Error("No user found with that username");
//         }

//         // compare password with user input
//         const isAuth = await user.comparePassword(password, user.password);


//         if (!isAuth) {
//             throw new Error("Not authenticated");
//         }

//         req.session.isAuth = true;
//         req.session.userId = user._id;

//     } catch (err) {
//         console.error(err);
//         const q = (new URLSearchParams({type: "fail", message: "failed to login"})).toString();

//         return res.redirect(`/login${q}`)
//     } finally {
//         const q = (new URLSearchParams({type: "success", message: "successfully logged in"})).toString();
//         return res.redirect(`/?${q}`);
//     }
// }


export default { getLogin, getRegisterForm, registerUser, logForm }