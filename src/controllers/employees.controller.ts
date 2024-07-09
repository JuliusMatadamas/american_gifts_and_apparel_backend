import {Request, Response} from "express";
import {HANDLE_HTTP_ERROR, HANDLE_HTTP_OK} from "../utils/handle.responses";
import {GET_EMPLOYEES_SERVICE, GET_EMPLOYEE_SERVICE, CREATE_EMPLOYEE_SERVICE, UPDATE_EMPLOYEE_SERVICE} from "../services/employees.service";
import {EMPLOYEES_FILTER} from "../helpers/employees.filter";

const GET_EMPLOYEES = async (req: Request, res: Response) => {
    try {
        const REG_EMPLOYEES = await GET_EMPLOYEES_SERVICE();
        if (REG_EMPLOYEES) {
            const DATA = EMPLOYEES_FILTER(REG_EMPLOYEES);
            HANDLE_HTTP_OK(res, 200, "Employees found in the DB", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "Not found employees");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
};

const GET_EMPLOYEE = async (req: Request, res: Response) => {
    try {
        const REG_EMPLOYEE = await GET_EMPLOYEE_SERVICE(req.params.id);
        if (REG_EMPLOYEE) {
            const DATA = EMPLOYEES_FILTER(REG_EMPLOYEE);
            HANDLE_HTTP_OK(res, 200, "Employee found in the DB", DATA);
        } else {
            HANDLE_HTTP_ERROR(res, 404, "Employee Not Found");
        }
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
};

const CREATE_EMPLOYEE = async (req: Request, res: Response) => {
    try {
        const NEW_EMPLOYEE = await CREATE_EMPLOYEE_SERVICE(req.body);
        const DATA = EMPLOYEES_FILTER(NEW_EMPLOYEE);
        HANDLE_HTTP_OK(res, 201, "Employee created successfully", DATA);
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
};

const UPDATE_EMPLOYEE = async (req: Request, res: Response) => {
    try {
        const UPDATED_EMPLOYEE = await UPDATE_EMPLOYEE_SERVICE(req.params.id, req.body)
        const DATA = EMPLOYEES_FILTER(UPDATED_EMPLOYEE);
        HANDLE_HTTP_OK(res, 200, "Employee updated correctly", DATA);
    } catch (error) {
        error instanceof Error ? HANDLE_HTTP_ERROR(res, 500, error.message) : HANDLE_HTTP_ERROR(res, 500, 'Unknown error');
    }
};

const DELETE_EMPLOYEE = (req: Request, res: Response) => {
};

export { GET_EMPLOYEES, GET_EMPLOYEE, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE }