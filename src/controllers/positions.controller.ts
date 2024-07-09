import {Request, Response} from "express";
import {HANDLE_HTTP} from "../utils/handle.error";
import {CREATE_POSITION_SERVICE, GET_POSITION_SERVICE, GET_POSITIONS_SERVICE} from "../services/positions.service";
import {Position} from "../interfaces/position.interface";

const GET_POSITIONS = async (req: Request, res: Response) => {
    try {
        const REG_POSITIONS = await GET_POSITIONS_SERVICE();
        if (REG_POSITIONS) {
            const REGS = JSON.parse(JSON.stringify(REG_POSITIONS));
            const POSITIONS = REGS.map( ({ _id = null, name = null }) => ({ _id, name }));
            res.status(200).json({
                message: "Positions found in the DB",
                data: POSITIONS
            });
        } else {
            res.status(404).json({
                message: "Not found positions",
                data: null
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            HANDLE_HTTP(res, error.message);
        } else {
            HANDLE_HTTP(res, 'Unknown error');
        }
    }
}

const GET_POSITION = async (req: Request, res: Response) => {
    try {
        const REG_POSITION = await GET_POSITION_SERVICE(req.params.id);
        if (REG_POSITION) {
            const REG = JSON.parse(JSON.stringify(REG_POSITION));
            const { _id = null, name = null } = REG;
            res.status(200).json({
                message: "Position found in the DB",
                data: { _id, name }
            });
        } else {
            res.status(404).json({
                message: "Position not found",
                data: null
            });
        }
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
        const NEW_POSITION = await CREATE_POSITION_SERVICE(req.body);
        const RES = JSON.parse(JSON.stringify(NEW_POSITION));
        const { _id = null, name = null } = RES;
        res.status(200).json({
            message: "Position created successfully",
            data: { _id, name }
        });
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP(res, error.message) : HANDLE_HTTP(res, 'Unknown error');
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