// async function logout(req, res) {
//     req.session.destroy();
//     req.logout();
//     let query = new URLSearchParams({type: "success", message: "Successfully Logged Out"});
//     res.redirect(`/login?${query}`);
// };

async function logout(req, res) {
    let query = null;
    try {
      req.session.destroy();
    } catch (err) {
        query = new URLSearchParams({type: "fail", message: "Couldn't Log Out"});
        return res.redirect(`/userPage?${query}`);
    } finally {
        query = new URLSearchParams({type: "success", message: "Successfully Logged Out"});
        res.redirect(`/login?${query}`);
    }
  }

export default { logout };