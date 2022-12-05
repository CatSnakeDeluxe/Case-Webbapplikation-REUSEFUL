import express from "express";
// import LoginController from "../controllers/LoginController.js";

const LogoutRouter = express.Router();

LogoutRouter.get('/login',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

export default LogoutRouter;