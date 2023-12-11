import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../../features/async.error.handler";
import Student from "../../models/student.model";
import GetId from "../../utils/get.db.id";


/**
 * Method UPDATE Student
 * 
 * @route /teacher/:prefix/:middle/:postfix
 * 
 * @param class(String) - class room of the student
 * @param subject(String) - the subject the teacher wishes to change
 * @param studentId(String) - the student id the teacher wishes to change
 * @param marks(Object<String, number>) - the marks value the teacher want to change
 * 
 * @Return on success the updated mark for the student 
 */
export const updateStudentMark = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    //check the teacher is teaching in that room
    const {studentId, subjectId}  = req.body;

    
    let student = await Student.findById({ _id: studentId}).populate({path: 'subjects.subject', match: { _id: subjectId }})
                    .exec()
                    .then((student) =>{
                        let index = 0;
                        for(let subject of student?.subjects || []){

                            if(subject['subject'] !== null){

                                student!.subjects[index].group_work = req.body.marks.group_work;
                                student!.subjects[index].individual_assignment = req.body.marks.individual_assignment;
                                student!.subjects[index].quiz = req.body.marks.quiz;
                                student!.subjects[index].test = req.body.marks.test;
                                student!.subjects[index].mid_exam = req.body.marks.mid_exam;
                                student!.subjects[index].final_exam = req.body.marks.final_exam;
                                student!.save();
                                res.status(200).json({
                                    status : "success",
                                    "id": studentId,
                                    "name": student!.name,
                                    subject: student!.subjects[index]
                                });
                            }
                        index++;
                        }
                    }).catch((err) => {
                        console.log(err);
                     });
        //This will never be undefined but to handle 
        //handle the next() by creating error;

});