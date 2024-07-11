import "dotenv/config";
import { Schema, model, SchemaTypeOptions, HydratedDocument, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";
import EMPLOYEE_MODEL from "./employee.model";

// @ts-ignore
interface UserSchemaType extends SchemaTypeOptions<User> {
    _id: {
        type: typeof Schema.Types.ObjectId;
        ref: string;
        required: [boolean, string];
    };
    email: {
        type: StringConstructor;
        unique: boolean;
        required: [boolean, string];
        validate: {
            validator: (v: string) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    password: {
        type: StringConstructor;
        required: boolean;
        trim: boolean;
        validate: {
            validator: (v: string) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    status: {
        type: StringConstructor;
        required: [boolean, string];
        enum: string[];
    };
    token: {
        type: StringConstructor;
    };
    expirationToken: {
        type: DateConstructor;
    };
}

const USER_SCHEMA_FIELDS: UserSchemaType = {
    _id: {
        type: Schema.Types.ObjectId,
        ref: "employees",
        required: [true, "The employee ID is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "The email is required"],
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `The email ${props.value} is not valid.`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v: string) {
                return /^[^\s]{5,10}$/.test(v);
            },
            message: props => `The password must be between 5 and 10 characters and should not contain spaces.`
        }
    },
    status: {
        type: String,
        required: [true, "The status is required"],
        enum: ['active', 'inactive'],
    },
    token: {
        type: String
    },
    expirationToken: {
        type: Date
    }
};

// @ts-ignore
const USER_SCHEMA = new Schema(USER_SCHEMA_FIELDS);

USER_SCHEMA.plugin(uniqueValidator, { message: "The {PATH} is already registered in the database, duplicates are not allowed." });

USER_SCHEMA.pre('save', async function (next) {
    const USER_DOCUMENT = this as unknown as HydratedDocument<User> & { password: string, token?: string, expirationToken?: Date };
    const SALT = await bcrypt.genSalt(10);
    const SK = process.env.SECRET_KEY || "5ll1BcEuPEXvUQFe8qO75R70sT66j74XvYen";
    const employeeExists = await EMPLOYEE_MODEL.exists({ _id: USER_DOCUMENT._id });

    if (!employeeExists) {
        const error = new Error("The employee ID is not valid.");
        return next(error);
    }

    if (USER_DOCUMENT.isModified('password')) {
        USER_DOCUMENT.password = await bcrypt.hash(USER_DOCUMENT.password, SALT);
    }

    USER_DOCUMENT.token = jwt.sign({ _id: USER_DOCUMENT._id }, SK, { expiresIn: '9h' });
    USER_DOCUMENT.expirationToken = new Date(Date.now() + 9 * 60 * 60 * 1000);
    next();
});

const USER_MODEL = model<User & Document>('users', USER_SCHEMA);

export default USER_MODEL;
