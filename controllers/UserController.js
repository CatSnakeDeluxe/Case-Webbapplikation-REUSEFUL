import UserModel from "../models/UserModel.js";

// RENDER PAGES
async function getLogin(req, res) {
    // res.render("login", { serverMessage: req.query });
    res.render("login");
}

async function getRegisterForm(req, res) {
    res.render("registerForm");
}

// REGISTER AND LOGIN FUNCTIONS
async function registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const newUserDocument = new UserModel({ username, email, password });

      newUserDocument.save();

    } catch (error) {
        console.error(err.message);
    } finally {
        res.redirect("/login");
    }
}

async function login(req, res) {
    try {
        const {username, password} = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            throw new Error("No user found with that username");
        }

        const isAuth = await user.comparePassword(password, user.password);

        if (!isAuth) {
            throw new Error("Not authenticated");
        }

        req.session.isAuth = true;
        req.session.userId = user._id;

    } catch (err) {
        console.error(err);
        const q = (new URLSearchParams({type: "fail", message: "failed to login"})).toString();

        return res.redirect(`/login${q}`)
    } finally {
        const q = (new URLSearchParams({type: "success", message: "successfully logged in"})).toString();
        // return res.redirect(`/?${q}`);
        res.redirect("/ads");
    }
}


export default { getLogin, login, getRegisterForm, registerUser }