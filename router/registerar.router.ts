import { Router } from "express";
import * as reg_studentController from "../controller/registrar/reg_student.controller";
import * as reg_teacherController from "../controller/registrar/reg_teacher.controller";
export const router = Router();

const getId = 'prefix/:middle/:postfix';
router.route('/student')
            .get(reg_studentController.getStudents)
            .post(reg_studentController.createStudent);

router.route(`/student/:${getId}`)
            .get(reg_studentController.getOneStudent)
            .put(reg_studentController.updateStudent)
            .delete(reg_studentController.deleteStudent);

router.route('/teacher')
            .get(reg_teacherController.getTeachers)
            .post(reg_teacherController.createTeacher)