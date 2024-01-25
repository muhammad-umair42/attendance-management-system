import { Router } from 'express';
import {
  userGetAttendance,
  userHomePageData,
  userMarkAttendance,
  userMarkLeave,
  userUpdateDetails,
  userUpdatePassword,
  userUpdateProfilePicture,
} from '../controllers/user.controller.js';
import { isUserAuthenticated } from '../middlewares/auth.middlewares.js';
import { upload } from './../middlewares/multer.middleware.js';

const router = Router();

router.route('/:id').get(isUserAuthenticated, userHomePageData);
router
  .route('/markattendance/:id')
  .get(isUserAuthenticated, userMarkAttendance);

router
  .route('/updateprofilepicture/:id')
  .put(
    isUserAuthenticated,
    upload.single('profilePicture'),
    userUpdateProfilePicture,
  );

router.route('/markleave/:id').post(isUserAuthenticated, userMarkLeave);
router.route('/userattendance/:id').get(isUserAuthenticated, userGetAttendance);
router.route('/updateuser/:id').put(isUserAuthenticated, userUpdateDetails);
router
  .route('/updatepassword/:id')
  .put(isUserAuthenticated, userUpdatePassword);
export default router;
