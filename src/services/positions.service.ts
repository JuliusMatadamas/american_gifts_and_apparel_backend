import POSITION_MODEL from "../models/position.model";
import {Position} from "../interfaces/position.interface";

const createPosition = async (position: Position) => {
    return await POSITION_MODEL.create(position);
}

export { createPosition };