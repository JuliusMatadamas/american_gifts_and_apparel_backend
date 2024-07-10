import POSITION_MODEL from "../models/position.model";
import EMPLOYEE_MODEL from "../models/employee.model";

const ASSIGNED_POSITION = async (id:string): Promise<boolean> => {
    let result = await EMPLOYEE_MODEL.findOne({ idPosition: id });
    return !!result;
}

export { ASSIGNED_POSITION };