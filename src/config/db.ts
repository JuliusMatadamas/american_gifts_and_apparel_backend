import "dotenv/config";
import {connect} from "mongoose";

async function dbConnect(): Promise<void> {
    const DB_HOST = <string>process.env.DB_HOST;
    await connect(DB_HOST)
}

export default dbConnect;