import {Position} from "./position.interface";

enum Genre {
    M = "M",
    F = "F"
}

export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    genre: Genre;
    email: string;
    mobile: string;
    address: string;
    starting: string;
    ending: string;
    idPosition: Position['_id'];
}