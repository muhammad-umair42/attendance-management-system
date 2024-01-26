import { Router } from 'express';
import { getUserGrade } from '../controllers/grade.controller.js';
import { isUserAuthenticated } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/:id').get(isUserAuthenticated, getUserGrade);

export default router;
