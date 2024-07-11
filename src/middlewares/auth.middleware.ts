import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import USER_MODEL from "../models/user.model";
import {HydratedDocument} from "mongoose";
import {User} from "../interfaces/user.interface";

interface AuthenticatedRequest extends Request {
    user?: HydratedDocument<User>;
}

const AUTH_MIDDLEWARE = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { _id, authorization } = req.headers;

        if (!_id) {
            return res.status(400).json({ message: "Missing '_id' in headers" });
        }

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(400).json({ message: "Missing or invalid 'Bearer Token' in headers" });
        }

        const token = authorization.split(" ")[1];
        const user = await USER_MODEL.findById(_id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.status !== "active") {
            return res.status(403).json({ message: "User is not active" });
        }

        if (user.token !== token) {
            return res.status(401).json({ message: "Invalid token" });
        }

        jwt.verify(token, process.env.SECRET_KEY || "5ll1BcEuPEXvUQFe8qO75R70sT66j74XvYen", (err) => {
            if (err) {
                return res.status(401).json(JSON.parse(JSON.stringify(err)));
            }

            req.user = user;
            next();
        });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: "Internal server error: " + error.message });
    }
};

export default AUTH_MIDDLEWARE;