import UserModel from "../models/UserModel.js";

async function getLogin(req, res) {
    // res.render("login", { serverMessage: req.query });
    res.render("login");
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            throw new Error("No user found with that username");
        }

        const checkUserAuth = await user.comparePassword(password, user.password);

        if (!checkUserAuth) {
            throw new Error("Not authenticated");
        }

        req.session.checkUserAuth = true;
        req.session.userId = user._id;
    } catch (err) {
        console.error(err);
        const q = (new URLSearchParams({type: "fail", message: "failed to login"})).toString();
        return res.redirect(`/login${q}`);
    } finally {
        const q = (new URLSearchParams({type: "success", message: "successfully logged in"})).toString();
        // return res.redirect(`/ads?${q}`), locals;
        // return res.redirect("/ads"), locals;
        res.locals.userID = req.session.userId;
        res.render("userPage");
    }
}

export default { getLogin, login }