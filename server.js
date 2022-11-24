import express from "express";
import session from "express-session";
import dotenv from 'dotenv';
import routeHomepage from './routes/route-homepage.js';

dotenv.config();

const app = express();

app.set("view engine", "ejs");

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

app.use('/', routeHomepage);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on port ${process.env.PORT}`);
});