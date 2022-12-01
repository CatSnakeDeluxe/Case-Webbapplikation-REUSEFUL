async function getUserPage(req, res) {
    res.render("userPage");
}

async function getUserAds(req, res) {
    // Get ads for logged in user
}

export default { getUserPage };