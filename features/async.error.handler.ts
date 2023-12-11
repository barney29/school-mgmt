import { NextFunction, Request, Response } from 'express';

const asyncErrorHandler = (func: any):any =>{
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((e: any) => next(e))
    };
};

export default asyncErrorHandler;