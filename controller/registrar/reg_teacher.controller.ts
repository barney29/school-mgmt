import asyncErrorHandler from "../../features/async.error.handler";
import Teacher from "../../models/teacher.model";
import CustomeError from "../../features/custome.error";
import { NextFunction, Request, Response } from "express";
import UniqueId from "../../utils/generate.id";
import { createTeacherDto } from "../../dtos/request.dto";
import GetId from "../../utils/get.db.id";



/**
 * Method POST Teacher
 * 
 * @route /registerar/teacher
 * 
 * @param name - full name joe doe
 * @param teaches - array of subject name ['math', 'eng']
 * @param class(className) - array of classes it teaches ['12A','12B']
 * @param club - student club that he/she administer if there is.
 * @param role - default teacher 
 * 
 * @Return on success the registered teacher 
 */

export const createTeacher = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const _id = await UniqueId.forTeacher();
    const {name, teaches, class: className, club, role} = req.body as createTeacherDto;
    
    //find the subjects id
    const subjects = await GetId.subject(teaches);
    const classRooms = await GetId.classRoom(className);
    if(subjects === -1){
        const error = new CustomeError(400, "Subject doesn't exist");
        next(error);
    } else if(classRooms === -1){
        const error = new CustomeError(400, "Class Room doesn't exist");
        next(error);
    } else {
        //:TODO implement if the subject has been taught by another teacher
        
        const teacher = await Teacher.create({_id: _id , name, teaches: subjects, class: classRooms, password: req.body.password});
        res.status(200).json({
        message: "success",
        teacher
    })
    }
    
});


/**
 * Method GET Teacher
 * 
 * @route /registerar/teacher 
 * 
 * @Return on success list of teachers
 */

export const getTeachers = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const teachers = await Teacher.find({}).populate('class').populate('teaches');
    res.status(200).json({
        status: "sucess",
        "teachers_count": teachers.length,
        teachers
    })
    
});

/**
 * Method GET oneTeacher
 * 
 * @route /registerar/teacher/:prefix/:middle/:postfix
 * 
 * @param _id = prefix/midlle/postfix  teacher id
 * 
 * @Return on success teacher with the same id
 */

export const getOneTeacher = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { prefix, middle, postfix } = req.params;
    const _id = `${prefix}/${middle}/${postfix}`;
    const teacher = await Teacher.findById({_id });
    
    if(!teacher){
        const error = new CustomeError(400, "Teacher with the specfied id doen't exist");
        next(error);
    }

    res.status(200).json({
        status: "success",
        teacher
    });
});

/**
 * Method PUT Teacher
 * 
 * @route /registerar/teacher/:prefix/:middle/:postfix
 * 
 * @param name - full name joe doe
 * @param teaches - array of subject name ['math', 'eng']
 * @param class(className) - array of classes it teaches ['12A','12B']
 * @param club - student club that he/she administer if there is.
 * @param role - default teacher 
 * 
 * @Return on success the updated teacher 
 */

export const updateTeacher = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { prefix, middle, postfix } = req.params;
    const _id = `${prefix}/${middle}/${postfix}`;
    const teacher = await Teacher.findById({_id });
    
    if(!teacher){
        const error = new CustomeError(400, "Teacher with the specfied id doen't exist");
        next(error);
    }
    //:TODO : implement update

    res.status(200).json({
        status: "success",
        teacher
    });
    
});

/**
 * Method DELETE Teacher
 * 
 * @route /registerar/teacher/:prefix/:middle/:postfix
 * 
 * @param name - full name joe doe
 * @param teaches - array of subject name ['math', 'eng']
 * @param class(className) - array of classes it teaches ['12A','12B']
 * @param club - student club that he/she administer if there is.
 * @param role - default teacher 
 * 
 * @Return on success the deleted teacher 
 */
export const deleteTeacher = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { prefix, middle, postfix } = req.params;
    const _id = `${prefix}/${middle}/${postfix}`;
    const teacher = await Teacher.findById({_id });
    
    if(!teacher){
        const error = new CustomeError(400, "Teacher with the specfied id doesn't exist");
        next(error);
    }
    //:TODO : implement delete -> remove access to the class room
    teacher!.class = [];
    await teacher!.save();

    res.status(200).json({
        status: "success",
        teacher
    });
    
});