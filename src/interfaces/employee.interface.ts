import {Position} from "./position.interface";

enum Genre {
    M = "M",
    F = "F"
}

export interface Employee {
    _id?: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    genre: Genre;
    email: string;
    mobile: string;
    address?: string;
    starting: Date;
    ending: Date;
    idPosition: Position['_id'];
    createdAt?: Date;
    updatedAt?: Date;
}