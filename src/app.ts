import "dotenv/config";
import express from "express";
import cors from "cors";
import {ROUTER} from "./routes/index.route";
import db from "./config/db";

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(cors());
APP.use(express.json());
APP.use('/american_gifts_and_apparel/api/v1', ROUTER);
db().then(() => {
    console.log(`Connection to database established.`);
})

APP.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});