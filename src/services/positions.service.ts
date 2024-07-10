import POSITION_MODEL from "../models/position.model";
import {Position} from "../interfaces/position.interface";
import {ASSIGNED_POSITION} from "../helpers/position.check";

const CREATE_POSITION_SERVICE = async (position: Position) => {
    return await POSITION_MODEL.create(position);
}

const GET_POSITION_SERVICE = async (_id: string) => {
    return POSITION_MODEL.findById(_id);
}

const GET_POSITIONS_SERVICE = async () => {
    return await POSITION_MODEL.find().exec();
}

const UPDATE_POSITION_SERVICE = async (_id: string, position: Position) => {
    return POSITION_MODEL.findByIdAndUpdate(_id, position, { new: true });
}

const DELETE_POSITION_SERVICE = async (_id: string) => {
    let result = await ASSIGNED_POSITION(_id);
    if (result) {
        throw new Error("Position is assigned and cannot be deleted");
    } else {
        return POSITION_MODEL.findByIdAndDelete(_id);
    }
}

export { CREATE_POSITION_SERVICE, GET_POSITION_SERVICE, GET_POSITIONS_SERVICE, UPDATE_POSITION_SERVICE, DELETE_POSITION_SERVICE }