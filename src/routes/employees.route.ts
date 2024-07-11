import {Router} from "express";
import {GET_EMPLOYEES, GET_EMPLOYEE, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE} from "../controllers/employees.controller";
import AUTH_MIDDLEWARE from "../middlewares/auth.middleware";

const ROUTER = Router();

ROUTER.get('/', AUTH_MIDDLEWARE, GET_EMPLOYEES);
ROUTER.get('/:id', AUTH_MIDDLEWARE, GET_EMPLOYEE);
ROUTER.post('/', AUTH_MIDDLEWARE, CREATE_EMPLOYEE);
ROUTER.put('/:id', AUTH_MIDDLEWARE, UPDATE_EMPLOYEE);
ROUTER.delete('/:id', AUTH_MIDDLEWARE, DELETE_EMPLOYEE);

export {ROUTER};