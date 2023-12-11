import { Model, Schema, StringExpressionOperatorReturningObject, Types } from "mongoose";
import Subject from "../models/subject.model";
import ClassRoom from "../models/class.room.model";
import { NextFunction } from "express";
import CustomeError from "../features/custome.error";

class GetId {
    public static async subject(subjects: string[] | string): Promise<Types.ObjectId[]| Types.ObjectId | number>{
        let id: Types.ObjectId[] = [];

        let subject;

        if(typeof subjects !== "string"){

            for(subject of subjects){
                subject = await Subject.find({subjectName: subject});
                if(subject.length == 0){
                    return -1;
                } else {
                    id.push(subject[0]._id);
                }

            }
        } else {
            subject = await Subject.find({subjectName: subjects});
            if(subject.length == 0){
                return -1;
            }
            if(subject.length == 1){
                return subject[0]._id;
            }

        }

        //TODO: implement signal handler
        return id;
    }

    public static async classRoom(room: string[] | string): Promise<Types.ObjectId[] | Types.ObjectId | number>{
        let id: Types.ObjectId[] = [];
        let classRoom;
        
        if(typeof room !== "string"){
            for(const value of room){
                classRoom = await ClassRoom.find({class: value });
                if(classRoom.length == 0){
                    return -1;
                }
                id.push(classRoom[0]._id);
            }
        }else {

        classRoom = await ClassRoom.find({class: room});
        if(classRoom.length == 0){
            return -1;
        }
        if(classRoom.length == 1){
            id.push(classRoom[0]._id);
             }
        }
        // console.log(id);
        return id;
    }
}


export default GetId;