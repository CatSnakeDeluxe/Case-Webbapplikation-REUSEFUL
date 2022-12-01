import UserModel from "../models/UserModel.js";

async function getRegisterForm(req, res) {
    res.render("registerForm");
}

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

export default { getRegisterForm, registerUser };