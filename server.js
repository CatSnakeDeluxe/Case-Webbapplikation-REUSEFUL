import express from "express";
import session from "express-session";
import dotenv from 'dotenv';
import path from 'path';
import routeHomepage from './routes/AdRoute.js';

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

app.use('/', routeHomepage);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on port ${process.env.PORT}`);
});