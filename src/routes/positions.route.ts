import {Router} from "express";
import {
    CREATE_POSITION,
    DELETE_POSITION,
    GET_POSITION,
    GET_POSITIONS,
    UPDATE_POSITION
} from "../controllers/positions.controller";
import AUTH_MIDDLEWARE from "../middlewares/auth.middleware";

const ROUTER = Router();

ROUTER.get('/', AUTH_MIDDLEWARE, GET_POSITIONS);
ROUTER.get('/:id', AUTH_MIDDLEWARE, GET_POSITION);
ROUTER.post('/', AUTH_MIDDLEWARE, CREATE_POSITION);
ROUTER.put('/:id', AUTH_MIDDLEWARE, UPDATE_POSITION);
ROUTER.delete('/:id', AUTH_MIDDLEWARE, DELETE_POSITION);

export {ROUTER};