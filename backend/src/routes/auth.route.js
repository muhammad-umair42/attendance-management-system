import { Router } from 'express';
import {
  loginUser,
  recoverAccount,
  registerUser,
} from '../controllers/auth.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/recoveraccount').post(recoverAccount);
router.route('/login').post(loginUser);
export default router;
