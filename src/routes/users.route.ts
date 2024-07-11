import {Router} from "express";
import {CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER} from "../controllers/users.controllers";
import AUTH_MIDDLEWARE from "../middlewares/auth.middleware";

const ROUTER = Router();

// @ts-ignore
ROUTER.get('/', AUTH_MIDDLEWARE, GET_USERS);
ROUTER.get('/:id', AUTH_MIDDLEWARE, GET_USER);
ROUTER.post('/', AUTH_MIDDLEWARE, CREATE_USER);
ROUTER.put('/:id', AUTH_MIDDLEWARE, UPDATE_USER);
ROUTER.delete('/:id', AUTH_MIDDLEWARE, DELETE_USER);

export {ROUTER};