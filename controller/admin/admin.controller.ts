import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../../features/async.error.handler";
import ClassRoom from "../../models/class.room.model";
import { createClassRoomDto } from "../../dtos/request.dto";
import CustomeError from "../../features/custome.error";
import GetId from "../../utils/get.db.id";

export const createClassRoom = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { className, numberOfStudent } = req.body as createClassRoomDto;
    const classRoom = await ClassRoom.create({class: className, numberOfStudent});

    res.status(201).json({
        status: "success",
        class: classRoom
    });
});


export const getClassRoom = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const classRooms = await ClassRoom.find({});

    res.status(200).json({
        status: "success",
        "class-rooms": classRooms
    });
});

export const updateClassRoom = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    //expected array of subject    
    const { class: className } = req.params;
    const { subjects } = req.body;
    const classRooms = await ClassRoom.find({class: className});
    if(classRooms.length == 0){
        const error = new CustomeError(400, "Class Room with the class name doesn't exist");
        next(error);
    }
    //two possible changes
    //1. change of student
    //2. change of subjects (only add)
    const listOfSubjects = await GetId.subject(subjects);
    if(listOfSubjects === -1){
        const error = new CustomeError(400, "Subject doesn't exist");
        next(error);
    }

    const updatedClass = await ClassRoom.findByIdAndUpdate({_id: classRooms[0]._id}, {subjects: listOfSubjects});

    res.status(200).json({
        status: "success",
        message: "class updated",
        "class-rooms": updatedClass
    });
});
