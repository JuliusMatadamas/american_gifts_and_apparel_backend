import "dotenv/config";
import express from "express";
import cors from "cors";
import {ROUTER} from "./routes/index.route";

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(cors());
APP.use(ROUTER);

APP.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});