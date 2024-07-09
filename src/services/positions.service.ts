import POSITION_MODEL from "../models/position.model";
import {Position} from "../interfaces/position.interface";

const CREATE_POSITION_SERVICE = async (position: Position) => {
    return await POSITION_MODEL.create(position);
}

const GET_POSITION_SERVICE = async (_id: string) => {
    return await POSITION_MODEL.findById(_id);
}

const GET_POSITIONS_SERVICE = async () => {
    return await POSITION_MODEL.find().exec();
}

const UPDATE_POSITION_SERVICE = async (_id: string, position: Position) => {
    return await POSITION_MODEL.findByIdAndUpdate(_id, position, { new: true });
}

export { CREATE_POSITION_SERVICE, GET_POSITION_SERVICE, GET_POSITIONS_SERVICE, UPDATE_POSITION_SERVICE }