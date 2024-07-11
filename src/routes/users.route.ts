import {NextFunction, Router} from "express";
import {CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER} from "../controllers/users.controllers";

const ROUTER = Router();

// @ts-ignore
ROUTER.get('/', GET_USERS);
ROUTER.get('/:id', GET_USER);
ROUTER.post('/', CREATE_USER);
ROUTER.put('/:id', UPDATE_USER);
ROUTER.delete('/:id', DELETE_USER);

export {ROUTER};