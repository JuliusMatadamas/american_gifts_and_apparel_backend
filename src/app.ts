import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(cors());

APP.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});