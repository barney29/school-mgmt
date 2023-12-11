import { Request, Response } from 'express';
import CustomeError from './custome.error';

const prodError = (error: CustomeError, res: Response): void => {
    res.status(500).json({
        message: error.message,
        error: {}//empty stack
    })
};
const devError = (error: CustomeError, res: Response): void => {
    res.status(error.statusCode).json({
        message: error.message,
        error//the entire stack
    })
};


const globalErrorHandler = (error: CustomeError, req: Request, res: Response, next: Function) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Error";
    if(process.env.NODE_ENV == 'development'){
        devError(error, res);
    }
    if(process.env.NODE_ENV == 'production'){
        prodError(error, res);
    }
    next();
}

export default globalErrorHandler;