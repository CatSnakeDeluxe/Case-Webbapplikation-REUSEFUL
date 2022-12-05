import UserModel from "../models/UserModel.js";

async function getLogin(req, res) {
    // res.render("login", { serverMessage: req.query });
    res.render("login");
}

async function login(req, res) {
    let locals = {};
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
        locals.userId = user._id;
    } catch (err) {
        console.error(err);
        return res.redirect("login");
        
    } finally {
        // const serverMessage = "Succesfully Logged In";
        // locals = { serverMessage, userId: user._id };
        locals.serverMessage = "Succesfully Logged In";
        // res.locals.userID = req.session.userId;
        // res.render("userPage", locals);
        res.redirect("/userPage");
    }
}

export default { getLogin, login }