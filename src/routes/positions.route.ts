import {NextFunction, Router} from "express";
import {
    CREATE_POSITION,
    DELETE_POSITION,
    GET_POSITION,
    GET_POSITIONS,
    UPDATE_POSITION
} from "../controllers/positions.controller";

const ROUTER = Router();

ROUTER.get('/', GET_POSITIONS);
ROUTER.get('/:id', GET_POSITION);
ROUTER.post('/', CREATE_POSITION);
ROUTER.put('/:id', UPDATE_POSITION);
ROUTER.delete('/:id', DELETE_POSITION);

export {ROUTER};