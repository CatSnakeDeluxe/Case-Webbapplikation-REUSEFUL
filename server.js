import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import AdRouter from "./routes/AdRoute.js";
import RegisterRouter from "./routes/RegisterRoute.js";
import LoginRouter from "./routes/LoginRoute.js";
import LogoutRouter from "./routes/LogoutRoute.js";
import UserPageRouter from "./routes/UserPageRoute.js";

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: Number(process.env.SESSION_MAXAGE) }
}));

app.set("view engine", "ejs");

function checkSession(req, res, next) {
    console.log(req.session);
    next();
}

app.use(checkSession);

app.use(express.static("./"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: Number(process.env.SESSION_MAXAGE) },
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));

app.use('/', AdRouter);
app.use('/login', LoginRouter);
app.use('/logout', LogoutRouter);
app.use('/register', RegisterRouter);
app.use('/userPage', UserPageRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on port ${process.env.PORT}`);
});