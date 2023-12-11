import { Router } from 'express';

import * as teacherGradeController from '../controller/teacher/teacher.grade.controller';
import { authorizeTeacher, isStudentInThatClass, isValidSubject, validateClassRoom } from '../middlewares/teacher.middleware';
export const router = Router();

const getId = 'prefix/:middle/:postfix';
router.route(`/:${getId}`)
            .put(validateClassRoom,authorizeTeacher, isStudentInThatClass, isValidSubject,teacherGradeController.updateStudentMark)

