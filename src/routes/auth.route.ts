import {Router} from "express";
import AUTH_MIDDLEWARE from "../middlewares/auth.middleware";
import {LOGIN, LOGOUT} from "../controllers/auth.controller";

const ROUTER = Router();

ROUTER.post('/login', LOGIN);
ROUTER.get('/logout', AUTH_MIDDLEWARE, LOGOUT);

export {ROUTER};