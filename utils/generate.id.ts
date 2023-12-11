import moment from "moment";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import { Model } from "mongoose";



const generateStudentId = (): string =>{
    const prefix = 'stu/';
    const middle_part = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const suffix = moment().format('YY');
    return prefix + middle_part + `/${suffix}`;
}

const generateTeacherId = (): string =>{
    const prefix = 'inst/';
    const middle_part = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const suffix = moment().format('YY');
    return prefix + middle_part + `/${suffix}`;
}

class UniqueId {
    public static async forStudent():Promise<string> {
        let student: Model<typeof Student> | undefined | null;
        let _id: string;
        do {
            _id = generateStudentId();
          student = await Student.findById({_id});
        }while(student);//if it is undefiend break the loop
        console.log(`Id is generated: ${_id}`)
        return  _id;
    }

    public static async forTeacher():Promise<string | null | undefined> {
        let teacher: Model<typeof Teacher> | undefined | null;
        let _id: string;
        do {
            _id = generateTeacherId();
          teacher = await Teacher.findById({_id});
        }while(teacher);
        console.log(`Id is generated: ${_id}`)
        return _id;
    }
}


export default UniqueId;