import { Router } from "express";
import * as adminController from "../controller/admin/admin.controller";
import * as reg_subjectController from "../controller/registrar/reg_subject.controller";

export const router = Router();

router.route('/class')
            .get(adminController.getClassRoom)
            .post(adminController.createClassRoom);
router.route('/class/:class')
            .put(adminController.updateClassRoom);
router.route('/subject')
            .get(reg_subjectController.getSubjects)
            .post(reg_subjectController.createSubject);