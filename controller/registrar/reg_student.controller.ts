import asyncErrorHandler from "../../features/async.error.handler";
import CustomeError from "../../features/custome.error";
import Student from "../../models/student.model";
import {NextFunction, Request, Response } from "express";
import UniqueId from "../../utils/generate.id";
import { createStudentDto, getStudentsDto } from "../../dtos/request.dto";
import ClassRoom from "../../models/class.room.model";
import Subject from "../../models/subject.model";
import bcrypt from "bcryptjs";

/**
 * Method POST Student
 * 
 * @route /registerar/student
 * 
 * @param name - full name joe doe
 * @param class(string) - array of classes it teaches ['12A','12B']
 * @param age(number) - The student age
 * 
 * @Return on success the registered student 
 */
export const createStudent = asyncErrorHandler( 
    async (req: Request, res: Response, next: NextFunction) => {

    const { name, class: className, age} = req.body as createStudentDto;
    const _id = await UniqueId.forStudent();
    let password = `${Math.floor(Math.random() * 1000)}`;

    password = await bcrypt.hash(password, 10);
    /**
     * Find the class room 
     * return array || empty array
     */
    let classRoom = await ClassRoom.find({class: className});
    //check if it is empty

    if (classRoom.length == 0){
        const error = new CustomeError(400, "Class Room doesn't exist.");
        next(error);
    };

    const classRoomWithSubject = await ClassRoom.findById({_id: classRoom[0]._id}).populate('subjects').exec();

    let subjects: object[] = [];
    for (const value of classRoomWithSubject!.subjects){
        subjects.push({ subject: value});
    }
    const student = await Student.create({_id, class: classRoom[0]._id, name, age, subjects, password});    

    if(student){
        //100% sure  student._id won't be null
        classRoomWithSubject!.students.push(student._id || '');
        await classRoomWithSubject?.save();
    
            res.status(201).json({
            status: "success",
            message: "Student created successfully",
            class: classRoom[0].class,
            student
            });
        }

}

);

/**
 * Method GET Student
 * 
 * @route /registerar/student/:prefix/:middle/:postfix
 * 
 * @param _id(string) - prefix + middle + postfix
 * 
 * @Return on success the retrived student 
 */
export const getOneStudent = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { prefix, middle, postfix } = req.params;
    const _id = `${prefix}/` + `${middle}/` + postfix;

    //find student
    const student = await Student.findById({ _id });

    if(student){
    res.status(200).json({
        status: "success",
        student
    });
    
    }else {
        const error = new CustomeError(400, "Student with specified Id donsn't exist");
        next(error);
    }

});

/**
 * Method GET Students
 * 
 * @route /registerar/student
 * 
 * @param class(string) - the class room to get access the students data
 * 
 * @Return on success the retrived student 
 */
export const getStudents = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { class: className } = req.body as getStudentsDto;
    /**
     * Getting all students at once is not allowed
     * instead it uses the class room id to return the students
     */
    
    const classRoom = await ClassRoom.find({class: className})

    //No class Room with specified
    if(classRoom.length == 0){
        const error = new CustomeError(400, "Class room doesn't exist");
        next(error);
    }
    else{
        const classRoomWithStudents = await ClassRoom.findById({ _id: classRoom[0]._id }).populate('students').select('subjects').exec(); 
        const context = {
            "status": "Success",
            "total_students": classRoomWithStudents?.students.length,
            students: classRoomWithStudents?.students
       }
       res.status(200).json(context);
    }
});


/**
 * Method PUT Student
 * 
 * @route /registerar/student/:prefix/:middle/:postfix
 * 
 * @param _id(string) - prefix + middle + postfix
 * 
 * @Return on success the updated student 
 */
export const updateStudent = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { prefix, middle, postfix } = req.params;
    const _id = `${prefix}/` + `${middle}/` + postfix;

    /**
     * before updating the data check what to update b/c classroom can affect it to remove it from the class itself too.
     */
     const student = await Student.findByIdAndUpdate({ _id }, req.body);

    if(student){
    res.status(200).json({
        status: "success",
        message: "student data updated",
        student
    });
    
    }else {
        const error = new CustomeError(400, "Student with specified Id doesn't exist");
        next(error);
    }
});

/**
 * Method DELETE Student
 * 
 * @route /registerar/student/:prefix/:middle/:postfix
 * 
 * @param _id(string) - prefix + middle + postfix
 * 
 * @Return on success the deleted student 
 */
export const deleteStudent = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { prefix, middle, postfix } = req.params;
    const _id = `${prefix}/` + `${middle}/` + postfix;
    console.log(_id);
    //delete student access to the class room
    const student = await Student.findById({ _id });

    if(student){
        
        const classRoomId = student?.class;
        //remove it from current class room
        const student_classRoom = await ClassRoom.findById({_id: classRoomId });
        
        const indexToRemove = student_classRoom?.students.indexOf(_id);
        //check if the student exist in the current class room
        if(indexToRemove !== -1 && indexToRemove !== undefined)
            student_classRoom?.students.splice(indexToRemove, 1);
        await student_classRoom?.save();
        /**
         * We only want to delete student from current access class room we need their record
         * add it to deleted_Student collection (or add in the student schema isLearning: true) 
         * 
         */
        //:TODOs record the DELETED DATA on the separate database[high cost but worth it]
    res.status(200).json({
        status: "success",
        message: "Student is deleted",
        student
    });
    
    }else {
        const error = new CustomeError(400, "Student with specified Id doesn't exist");
        next(error);
    }
})