import {Request, Response} from "express";
import {HANDLE_HTTP_ERROR, HANDLE_HTTP_OK} from "../utils/handle.responses";
import {GET_USER_SERVICE, GET_USERS_SERVICE, CREATE_USER_SERVICE, UPDATE_USER_SERVICE, DELETE_USER_SERVICE} from "../services/users.service";
import {USERS_FILTER} from "../helpers/users.filter";
import {UPDATE_EMPLOYEE_SERVICE} from "../services/employees.service";
import {EMPLOYEES_FILTER} from "../helpers/employees.filter";

const CREATE_USER = async (req: Request, res: Response) => {
    try {
        const NEW_USER = await CREATE_USER_SERVICE(req.body);
        const DATA = USERS_FILTER(NEW_USER);
        HANDLE_HTTP_OK(res, 201, "User created successfully", DATA);
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const GET_USER = async (req: Request, res: Response) => {
    try {
        const REG_USER = await GET_USER_SERVICE(req.params.id);
        if (REG_USER) {
            const DATA = USERS_FILTER(REG_USER);
            HANDLE_HTTP_OK(res, 200, "User found in the DB", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "User Not Found");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const GET_USERS = async (req: Request, res: Response) => {
    try {
        const REG_USERS = await GET_USERS_SERVICE();
        if (REG_USERS) {
            const DATA = USERS_FILTER(REG_USERS);
            HANDLE_HTTP_OK(res, 200, "Users found in the DB", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "Not found users");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const UPDATE_USER = async (req: Request, res: Response) => {
    try {
        const UPDATED_USER = await UPDATE_USER_SERVICE(req.params.id, req.body)
        const DATA = USERS_FILTER(UPDATED_USER);
        HANDLE_HTTP_OK(res, 200, "User updated correctly", DATA);
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const DELETE_USER = (req: Request, res: Response) => {
}

export {CREATE_USER, GET_USER, GET_USERS, UPDATE_USER, DELETE_USER};