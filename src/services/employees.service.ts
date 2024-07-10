import EMPLOYEE_MODEL from "../models/employee.model";
import {Employee} from "../interfaces/employee.interface";

const GET_EMPLOYEES_SERVICE = async () => {
    return await EMPLOYEE_MODEL.find().exec();
};

const GET_EMPLOYEE_SERVICE = async (_id: string) => {
    return EMPLOYEE_MODEL.findById(_id);
};

const CREATE_EMPLOYEE_SERVICE = async (employee: Employee) => {
    return await EMPLOYEE_MODEL.create(employee);
};

const UPDATE_EMPLOYEE_SERVICE = async (_id: string, employee: Employee) => {
    return EMPLOYEE_MODEL.findByIdAndUpdate(_id, employee, { new: true});
}

export {GET_EMPLOYEES_SERVICE,GET_EMPLOYEE_SERVICE,CREATE_EMPLOYEE_SERVICE,UPDATE_EMPLOYEE_SERVICE}