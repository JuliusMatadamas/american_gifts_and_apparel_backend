import { Response } from "express";

const HANDLE_HTTP_ERROR = (res: Response, code:number = 500, error: string) => {
    res.status(code);

    if (error.includes("E11000")) {
        error = "The key" + (error.split("{")[1]).split(":")[0] + " is already registered in the database and duplicates are not allowed.";
    }

    res.json({
        message: `Server error: ${error}`,
        data: null
    });
};

const HANDLE_HTTP_OK = (res: Response, code:number = 200, message: string, data:any[]) => {
    res.status(code);
    res.json({
        message: message,
        data: data
    });
}

export { HANDLE_HTTP_ERROR, HANDLE_HTTP_OK };
