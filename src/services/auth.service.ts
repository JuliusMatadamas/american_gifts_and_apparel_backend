import USER_MODEL from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const LOGIN_SERVICE = async (email: string, password: string) => {
    let user = await USER_MODEL.findOne({email: email});

    if (!user) {
        throw new Error("These credentials do not match our records.");
    }

    if (user.status === "inactive") {
        throw new Error("The user is disabled");
    }

    const IS_MATCH = await bcrypt.compare(password, user.password);
    if (!IS_MATCH) {
        throw new Error("These credentials do not match our records.");
    }

    const SK = process.env.SECRET_KEY;

    // Actualizar el usuario con el nuevo token
    // @ts-ignore
    const NEW_TOKEN = jwt.sign({ _id: user._id }, SK, { expiresIn: '9h' });
    const NEW_EXPIRATION_TOKEN = new Date(Date.now() + 9 * 60 * 60 * 1000);
    await user.updateOne({ token: NEW_TOKEN, expirationToken: NEW_EXPIRATION_TOKEN });

    return { _id: user._id, email: user.email, status: user.status, token: NEW_TOKEN, expirationToken: NEW_EXPIRATION_TOKEN };
}

const LOGOUT_SERVICE = async (id: string) => {
    return USER_MODEL.findByIdAndUpdate(id, { token: '', expirationToken: '' }, { new: true });
}

export {LOGIN_SERVICE, LOGOUT_SERVICE};