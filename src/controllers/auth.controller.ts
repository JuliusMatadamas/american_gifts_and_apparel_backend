import {Request, Response} from "express";
import {HANDLE_HTTP_ERROR, HANDLE_HTTP_OK} from "../utils/handle.responses";
import {LOGIN_SERVICE, LOGOUT_SERVICE} from "../services/auth.service";
import {USERS_FILTER} from "../helpers/users.filter";

const LOGIN = async (req: Request, res: Response) => {
    try {
        const { email = null, password = null } = req.body;

        if(!email) return HANDLE_HTTP_ERROR(res, 400, "Email are required.");

        if(!password) return HANDLE_HTTP_ERROR(res, 400, "Password are required.");

        const LOGGED_USER = await LOGIN_SERVICE(email, password);

        if (LOGGED_USER) {
            const DATA = USERS_FILTER(LOGGED_USER);
            HANDLE_HTTP_OK(res, 200, "User successfully logged in", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "These credentials do not match our records.");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, "Unknown error");
    }
}

const LOGOUT = async (req: Request, res: Response) => {
    try {
        const ID = req.headers['_id'];
        if (!ID || typeof ID !== 'string') {
            HANDLE_HTTP_ERROR(res, 400, "Missing or invalid _id in headers");
            return;
        }

        const UNLOGGED_USER = await LOGOUT_SERVICE(ID);
        if (UNLOGGED_USER) {
            const DATA = USERS_FILTER(UNLOGGED_USER);
            HANDLE_HTTP_OK(res, 200, "User is logged out", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "These credentials do not match our records.");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, "Unknown error");
    }
}

export {LOGIN, LOGOUT}