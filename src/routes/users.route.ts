import {NextFunction, Router} from "express";

const ROUTER = Router();

// @ts-ignore
ROUTER.get('/', (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    res.status(200).json({
        "message": "",
        "data": {}
    });
});

export {ROUTER};