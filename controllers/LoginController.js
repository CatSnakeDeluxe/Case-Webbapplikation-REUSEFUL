import UserModel from "../models/UserModel.js";

async function getLogin(req, res) {
    res.render("login", { serverMessage: req.query });
}

async function login(req, res) {
    let query = null;
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
        query = new URLSearchParams({ type: "fail", message: "Failed To Log In" });

        return res.redirect(`/login?${query}`);
    } finally {
        query = new URLSearchParams({ type: "success", message: "Successfully Logged In" });
        res.redirect(`/userPage?${query}`);
    }
}

async function logout(req, res) {
    let query = null;
    try {
        req.session.destroy();
    } catch (err) {
        query = new URLSearchParams({ type: "fail", message: "Couldn't Log Out" });
        return res.redirect(`/userPage?${query}`);
    } finally {
        query = new URLSearchParams({ type: "success", message: "Successfully Logged Out" });
        res.redirect(`/login?${query}`);
    }
}

export default { getLogin, login, logout }