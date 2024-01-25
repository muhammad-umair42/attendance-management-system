import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  recoverAccount,
  registerUser,
} from '../controllers/auth.controller.js';
import { isUserAuthenticated } from './../middlewares/auth.middlewares.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/recoveraccount').post(recoverAccount);
router.route('/login').post(loginUser);
router.route('/logout/:id').get(isUserAuthenticated, logoutUser);
export default router;
