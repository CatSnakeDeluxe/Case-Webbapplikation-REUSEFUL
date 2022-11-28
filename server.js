import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import AdRouter from "./routes/AdRoute.js";
import LoginRouter from "./routes/LoginRoute.js";
import RegisterRouter from "./routes/RegisterRoute.js"

dotenv.config();

const app = express();

app.set("view engine", "ejs");

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static("./"));
// app.use(express.static(__dirname));

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
app.use('/register', RegisterRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on port ${process.env.PORT}`);
});