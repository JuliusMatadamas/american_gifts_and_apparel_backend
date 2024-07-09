import {Router} from "express";
import {GET_EMPLOYEES, GET_EMPLOYEE, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE} from "../controllers/employees.controller";

const ROUTER = Router();

ROUTER.get('/', GET_EMPLOYEES);
ROUTER.get('/:id', GET_EMPLOYEE);
ROUTER.post('/', CREATE_EMPLOYEE);
ROUTER.put('/:id', UPDATE_EMPLOYEE);
ROUTER.delete('/:id', DELETE_EMPLOYEE);

export {ROUTER};