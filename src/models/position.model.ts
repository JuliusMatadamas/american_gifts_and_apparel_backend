import {Schema, model, SchemaTypeOptions} from "mongoose";
import {Position} from "../interfaces/position.interface";
import uniqueValidator from "mongoose-unique-validator";

interface PositionSchemaType extends SchemaTypeOptions<Position> {
    name: {
        type: StringConstructor;
        required: [boolean, string];
        minlength: [number, string];
        maxlength: [number, string];
        unique: boolean;
        lowercase: boolean;
        trim: boolean;
        validate: {
            validator: (v: string) => boolean;
            message: (props: { value: string }) => string;
        };
    };
}


const POSITION_SCHEMA_FIELDS: PositionSchemaType = {
    name: {
        type: String,
        required: [true, "The name is required"],
        minlength: [5, "The name must be at least 5 characters long"],
        maxlength: [20, "The name must not exceed 20 characters"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v: string) {
                return /^[a-záéíóúñü\s]+$/i.test(v);
            },
            message: props => `The ${props.value} is not a valid value. Only letters, and spaces are allowed.`
        }
    }
};

// @ts-ignore
const POSITION_SCHEMA = new Schema(POSITION_SCHEMA_FIELDS, {
    timestamps: true,
    versionKey: false
});

POSITION_SCHEMA.plugin(uniqueValidator, { message: "The {PATH} is already registered in the database, duplicates are not allowed."});

const POSITION_MODEL = model("positions", POSITION_SCHEMA);
export default POSITION_MODEL;