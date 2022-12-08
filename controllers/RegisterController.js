import UserModel from "../models/UserModel.js";

async function getRegisterForm(req, res) {
    res.render("registerForm", { serverMessage: req.query });
}

async function registerUser(req, res) {
    let query = null;
    try {
      const { username, email, password } = req.body;

      const newUserDocument = new UserModel({ username, email, password });

      newUserDocument.save();

    } catch (error) {
        console.error(error.message);
        query = new URLSearchParams({type: "fail", message: "Username Taken"});
        return res.redirect(`/register?${query}`);

    } finally {
        query = new URLSearchParams({type: "success", message: "Successfully Created User"});
        res.redirect(`/login?${query}`);
    }
}

export default { getRegisterForm, registerUser };