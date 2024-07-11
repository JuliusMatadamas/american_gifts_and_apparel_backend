import USER_MODEL from "../models/user.model";
import jwt from 'jsonwebtoken';
import {User} from "../interfaces/user.interface";

const GET_USER_SERVICE = async (_id:string) => {
    return USER_MODEL.findById(_id);
}

const GET_USERS_SERVICE = async () => {
    return await USER_MODEL.find().exec();
}

const CREATE_USER_SERVICE = async (user: User) => {
    return await USER_MODEL.create(user);
}

const UPDATE_USER_SERVICE = async (_id: string, user: User) => {
    const existingUser = await USER_MODEL.findById(_id);

    if (!existingUser) {
        throw new Error("User not found");
    }

    if (user.status === 'inactive') {
        user.token = "";
        // @ts-ignore
        user.expirationToken = "";
    } else if (user.status === 'active') {
        const SK = process.env.SECRET_KEY || "5ll1BcEuPEXvUQFe8qO75R70sT66j74XvYen";
        user.token = jwt.sign({ _id: existingUser._id }, SK, { expiresIn: '9h' });
        user.expirationToken = new Date(Date.now() + 9 * 60 * 60 * 1000);
    }

    return USER_MODEL.findByIdAndUpdate(_id, user, { new: true });
}

const DELETE_USER_SERVICE = () => {
}

export {GET_USER_SERVICE, GET_USERS_SERVICE, CREATE_USER_SERVICE, UPDATE_USER_SERVICE, DELETE_USER_SERVICE}