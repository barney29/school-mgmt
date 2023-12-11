import { createSubjectDto } from "../../dtos/request.dto";
import asyncErrorHandler from "../../features/async.error.handler";
import CustomeError from "../../features/custome.error";
import Subject from "../../models/subject.model";
import { NextFunction, Request, Response} from "express";

export const createSubject = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) =>{
    const { name } = req.body as createSubjectDto;
    const subject = await Subject.create({subjectName: name.toLowerCase()});
    res.status(201).json({
        status: "sucess",
        subject
    });
});

export const getSubjects = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) =>{
    const subjects = await Subject.find();
    if(subjects.length == 0){
        const error = new CustomeError(400, "There are no subjects");
        next(error);
    }
    res.status(200).json({
        status: "sucess",
        subjects
    })
});
