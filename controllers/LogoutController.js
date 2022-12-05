async function logout(req, res) {
    req.session.destroy();
    req.logout();
    let query = new URLSearchParams({type: "success", message: "Successfully Logged Out"});
    res.redirect(`/login?${query}`);
};

export default { logout };