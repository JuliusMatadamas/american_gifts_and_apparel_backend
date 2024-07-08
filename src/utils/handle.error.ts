import { Response } from "express";

const HANDLE_HTTP = (res: Response, error: string) => {
    res.status(500);
    res.json({
        message: `Server error: ${error}`,
        data: null
    });
};

export { HANDLE_HTTP };
