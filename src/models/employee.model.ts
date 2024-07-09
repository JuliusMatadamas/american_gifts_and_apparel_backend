import { Schema, model, SchemaTypeOptions } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { Employee } from "../interfaces/employee.interface";

interface EmployeeSchemaType extends SchemaTypeOptions<Employee> {
    firstName: {
        type: StringConstructor;
        required: [boolean, string];
        minlength: [number, string];
        maxlength: [number, string];
        lowercase: boolean;
        trim: boolean;
        validate: {
            validator: (v: string) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    lastName: {
        type: StringConstructor;
        required: [boolean, string];
        minlength: [number, string];
        maxlength: [number, string];
        lowercase: boolean;
        trim: boolean;
        validate: {
            validator: (v: string) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    birthDate: {
        type: DateConstructor;
        required: [boolean, string];
        validate: {
            validator: (v: Date) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    genre: {
        type: StringConstructor;
        required: [boolean, string];
        enum: [string, string];
        message: string;
    };
    email: {
        type: StringConstructor;
        required: [boolean, string];
        validate: {
            validator: (v: string) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    mobile: {
        type: StringConstructor;
        required: [boolean, string];
        minlength: [number, string];
        maxlength: [number, string];
        validate: {
            validator: (v: string) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    address: {
        type: StringConstructor;
        required?: [boolean, string];
        minlength: [number, string];
        maxlength: [number, string];
        lowercase: boolean;
        trim: boolean;
    };
    starting: {
        type: DateConstructor;
        required: [boolean, string];
        validate: {
            validator: (v: Date) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    ending: {
        type: DateConstructor;
        validate: {
            validator: (v: Date) => boolean;
            message: (props: { value: string }) => string;
        };
    };
    idPosition: {
        type: typeof Schema.Types.ObjectId;
        ref: string;
        required: [boolean, string];
    };
}

const EMPLOYEE_SCHEMA_FIELDS: EmployeeSchemaType = {
    firstName: {
        type: String,
        required: [true, "The firstname is required"],
        minlength: [2, "The name must be at least 2 characters long"],
        maxlength: [45, "The name must not exceed 45 characters"],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v: string) {
                return /^[a-záéíóúñü\s]+$/i.test(v);
            },
            message: props => `The ${props.value} is not a valid value. Only letters, and spaces are allowed.`
        }
    },
    lastName: {
        type: String,
        required: [true, "The lastname is required"],
        minlength: [2, "The name must be at least 2 characters long"],
        maxlength: [45, "The name must not exceed 45 characters"],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v: string) {
                return /^[a-záéíóúñü\s]+$/i.test(v);
            },
            message: props => `The ${props.value} is not a valid value. Only letters, and spaces are allowed.`
        }
    },
    birthDate: {
        type: Date,
        required: [true, "The birth date is required"],
        validate: {
            validator: function (v: Date) {
                const date = new Date(v);
                const now = new Date();
                const minDate = new Date(now.getFullYear() - 60, now.getMonth(), now.getDate());
                const maxDate = new Date(now.getFullYear() - 17, now.getMonth(), now.getDate());
                return date >= minDate && date <= maxDate;
            },
            message: props => `The birth date ${props.value} is not valid. It must be between 17 and 60 years ago.`
        }
    },
    genre: {
        type: String,
        required: [true, "The genre is required"],
        enum: ['M', 'F'],
        message: "The genre must be either 'M' or 'F'"
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `The email ${props.value} is not valid.`
        }
    },
    mobile: {
        type: String,
        required: [true, "The mobile number is required"],
        minlength: [10, "The mobile number must be 10 characters long"],
        maxlength: [10, "The mobile number must be 10 characters long"],
        validate: {
            validator: function (v: string) {
                return /^\d{10}$/.test(v);
            },
            message: props => `The mobile number ${props.value} is not valid. It must be exactly 10 digits.`
        }
    },
    address: {
        type: String,
        minlength: [5, "The address must be at least 5 characters long"],
        maxlength: [255, "The address must not exceed 255 characters"],
        lowercase: true,
        trim: true
    },
    starting: {
        type: Date,
        required: [true, "The starting date is required"],
        validate: {
            validator: function (v: Date) {
                return new Date(v) >= new Date('2020-01-01');
            },
            message: props => `The starting date ${props.value} is not valid. It must be after 2020-01-01.`
        }
    },
    ending: {
        type: Date,
        validate: {
            validator: function (v: Date) {
                // @ts-ignore
                return !this.starting || new Date(v) > new Date(this.starting);
            },
            message: function (props) {
                // @ts-ignore
                return `The ending date ${props.value} is not valid. It must be after the starting date ${this.starting}.`;
            }
        }
    },
    idPosition: {
        type: Schema.Types.ObjectId,
        ref: "positions",
        required: [true, "The position ID is required"]
    }
};

const EMPLOYEE_SCHEMA = new Schema(EMPLOYEE_SCHEMA_FIELDS, {
    timestamps: true,
    versionKey: false
});

EMPLOYEE_SCHEMA.plugin(uniqueValidator, { message: "The {PATH} is already registered in the database, duplicates are not allowed." });

const EMPLOYEE_MODEL = model("employees", EMPLOYEE_SCHEMA);
export default EMPLOYEE_MODEL;
