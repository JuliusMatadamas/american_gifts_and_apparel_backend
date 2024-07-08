import {Employee} from "./employee.interface";

enum Status {
    active = "active",
    inactive = "inactive"
}

export interface User {
    _id: Employee['_id'];
    email: string;
    password: string;
    status: Status;
    token: string;
}