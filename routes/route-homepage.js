import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    
    // use ejs method render, takes 2 params
    // param 2 - pass object
    res.render("index", {});
});

export default router;