import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import AdRouter from "./routes/AdRoute.js";
import UserRouter from "./routes/UserRoute.js";
// import UserRouter from "./routes/loginHenryStyle.js";
import RegisterRouter from "./routes/RegisterRoute.js"

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 5 }
}));

app.set("view engine", "ejs");

function checkSession(req, res, next) {
    console.log(req.session);
  
    next();
}

// tell app to use middleware function everywhere
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
app.use('/login', UserRouter);
app.use('/register', RegisterRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on port ${process.env.PORT}`);
});