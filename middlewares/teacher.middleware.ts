import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../features/async.error.handler";
import ClassRoom from "../models/class.room.model";
import CustomeError from "../features/custome.error";
import Teacher from "../models/teacher.model";
import GetId from "../utils/get.db.id";
import Student from "../models/student.model";

export const validateClassRoom = asyncErrorHandler(async (req: Request, res: Response,next: NextFunction) => {
    const { class: className } = req.body;
    
    const classRoom = await ClassRoom.find({class: className});
    if(classRoom.length == 0){
        const error = new CustomeError(400, "There is no room with specified name");
        return next(error);
    } else {
        req.body.classRoomId = classRoom[0]._id;
        return next();
    }
})

export const authorizeTeacher = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { prefix, middle, postfix } = req.params;
    const teacherId = `${prefix}/${middle}/${postfix}`;
    const teacher = await Teacher.findById({ _id: teacherId });
    if(!teacher){
        const error = new CustomeError(400, "Teacher Id doesn't exist");
        return next(error);
    } else {
        req.body.teacherId = teacherId;
        req.body.teacher = teacher;
    }

    if (teacher?.class.indexOf(req.body.classRoomId) === -1){
        const error = new CustomeError(401, "You are not authorized to access the class room");
        return next(error);
    } else {

        /**
         * if the teacher is teaching in that class then
         * find the id for the subject he is asking.
         */
        const subjectId = await GetId.subject(req.body.subject);
        req.body.subjectId = subjectId;
        return next();
    }
})

export const isStudentInThatClass = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    //Get The ClassRoom Id

    const student = await Student.findById({ _id: req.body.studentId });
    //Get the student with the specified id
    if(!student){
        const error = new CustomeError(400, "Student with the specified id doesn't exist");
        return next(error);
    }
    if(!(student.class.equals(req.body.classRoomId))){
        const error = new CustomeError(401, "You are not authorized to access students you don't teach");
        return next(error);
    }
    if(student.class.equals(req.body.classRoomId))
        return next();
    //if student.class == req.body.clarssRoomId : allow access : deny
});

export const isValidSubject = asyncErrorHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { teacher } = req.body;
    const { subjectId } = req.body;
    if(teacher.teaches.indexOf(subjectId) === -1){
        const error = new CustomeError(401, "You are not allowed to access the subject you don't teach.");
        return next(error);
    }

    //discard the req.body.teacher value
    req.body.teacher = 0;
    console.log('middle ware finished')
    return next();
})