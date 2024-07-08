import {Schema, model} from "mongoose";
import {Position} from "../interfaces/position.interface";

const POSITION_SCHEMA = new Schema<Position>({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        unique: true,
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const POSITION_MODEL = model("positions", POSITION_SCHEMA);
export default POSITION_MODEL;