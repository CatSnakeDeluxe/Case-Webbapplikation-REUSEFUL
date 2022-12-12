import UserModel from "../models/UserModel.js";

async function getRegisterForm(req, res) {
    res.render("registerForm", { serverMessage: req.query });
}

async function registerUser(req, res) {
    let query = null;
    try {
        const { username, email, password } = req.body;
        const newUserDocument = new UserModel({ username, email, password });

        if (username.value === "" || email.value === "" || password.value === "") {
            throw new Error("All fields required");
        }

    //   const existingUsername = await UserModel.findOne({ username });

    //   console.log(existingUsername);

    //   if (existingUsername === req.body.username) {
    //     throw new Error("Username Taken");
    //   }

        newUserDocument.save();

        query = new URLSearchParams({type: "success", message: "Successfully Created User"});
        res.redirect(`/login?${query}`);
    } catch (error) {
        console.error(error.message);
        query = new URLSearchParams({type: "fail", message: error.message});
        return res.redirect(`/register?${query}`);
    }
}

export default { getRegisterForm, registerUser };