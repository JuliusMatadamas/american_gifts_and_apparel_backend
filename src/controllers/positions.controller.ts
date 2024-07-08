import {Request, Response} from "express";
import {HANDLE_HTTP} from "../utils/handle.error";
import {createPosition} from "../services/positions.service";

const GET_POSITIONS = (req: Request, res: Response) => {
    try {
    } catch (error) {
        if (error instanceof Error) {
            HANDLE_HTTP(res, error.message);
        } else {
            HANDLE_HTTP(res, 'Unknown error');
        }
    }
}

const GET_POSITION = (req: Request, res: Response) => {
    try {
    } catch (error) {
        if (error instanceof Error) {
            HANDLE_HTTP(res, error.message);
        } else {
            HANDLE_HTTP(res, 'Unknown error');
        }
    }
}

const CREATE_POSITION = async (req: Request, res: Response) => {
    try {
        let response = await createPosition(req.body);
        res.status(200).json({
            message: "Position created successfully",
            data: response
        });
    } catch (error) {
        if (error instanceof Error) {
            HANDLE_HTTP(res, error.message);
        } else {
            HANDLE_HTTP(res, 'Unknown error');
        }
    }
}

const UPDATE_POSITION = (req: Request, res: Response) => {
    try {
    } catch (error) {
        if (error instanceof Error) {
            HANDLE_HTTP(res, error.message);
        } else {
            HANDLE_HTTP(res, 'Unknown error');
        }
    }
}

const DELETE_POSITION = (req: Request, res: Response) => {
    try {
    } catch (error) {
        if (error instanceof Error) {
            HANDLE_HTTP(res, error.message);
        } else {
            HANDLE_HTTP(res, 'Unknown error');
        }
    }
}

export { GET_POSITIONS, GET_POSITION, CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION };