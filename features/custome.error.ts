class CustomeError extends Error {
    public status:string;
    private isOperational: boolean;


    constructor(public statusCode: number, public message: string ) {
        super(message);
        this.status = statusCode >= 400 && statusCode < 500 ? "Fail": "Error";

        this.isOperational = true;
        Error.captureStackTrace(this, Error.captureStackTrace);
    };

};

export default CustomeError;