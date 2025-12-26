import express from 'express';
import { patientRegister, patientLogin, doctorLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/patient/register', patientRegister);
router.post('/patient/login', patientLogin);
router.post('/doctor/login', doctorLogin);

export default router;
