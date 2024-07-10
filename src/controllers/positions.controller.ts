import {Request, Response} from "express";
import {HANDLE_HTTP_ERROR, HANDLE_HTTP_OK} from "../utils/handle.responses";
import {CREATE_POSITION_SERVICE, GET_POSITION_SERVICE, GET_POSITIONS_SERVICE, UPDATE_POSITION_SERVICE, DELETE_POSITION_SERVICE} from "../services/positions.service";
import {POSITIONS_FILTER} from "../helpers/positions.filter";

const GET_POSITIONS = async (req: Request, res: Response) => {
    try {
        const REG_POSITIONS = await GET_POSITIONS_SERVICE();
        if (REG_POSITIONS) {
            const DATA = POSITIONS_FILTER(REG_POSITIONS);
            HANDLE_HTTP_OK(res, 200, "Positions found in the DB", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "Not found positions");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const GET_POSITION = async (req: Request, res: Response) => {
    try {
        const REG_POSITION = await GET_POSITION_SERVICE(req.params.id);
        if (REG_POSITION) {
            const DATA = POSITIONS_FILTER(REG_POSITION);
            HANDLE_HTTP_OK(res, 200, "Position found in the DB", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "Position Not Found");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const CREATE_POSITION = async (req: Request, res: Response) => {
    try {
        const NEW_POSITION = await CREATE_POSITION_SERVICE(req.body);
        const DATA = POSITIONS_FILTER(NEW_POSITION);
        HANDLE_HTTP_OK(res, 201, "Position correctly created", DATA);
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const UPDATE_POSITION = async (req: Request, res: Response) => {
    try {
        const UPDATED_POSITION = await UPDATE_POSITION_SERVICE(req.params.id, req.body)
        const DATA = POSITIONS_FILTER(UPDATED_POSITION);
        HANDLE_HTTP_OK(res, 200, "Position correctly updated", DATA);
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
}

const DELETE_POSITION = async (req: Request, res: Response) => {
    try {
        const DELETED_POSITION = await DELETE_POSITION_SERVICE(req.params.id)
        const DATA = POSITIONS_FILTER(DELETED_POSITION);
        HANDLE_HTTP_OK(res, 200, "Position correctly deleted", DATA);
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500,  'Unknown error');
    }
}

export { GET_POSITIONS, GET_POSITION, CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION };