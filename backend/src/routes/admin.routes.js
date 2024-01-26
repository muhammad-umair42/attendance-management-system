import { Router } from 'express';
import {
  changeLeaveStatus,
  createReport,
  createUserAttendance,
  deleteUserAttendance,
  getAdminDashboard,
  getAllLeaves,
  getAttendances,
  getReports,
  getUserAttendance,
} from '../controllers/admin.controller.js';
import { isUserAdmin } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/home').get(isUserAdmin, getAdminDashboard);
router.route('/attendances').get(isUserAdmin, getAttendances);
router.route('/attendance/:id').get(isUserAdmin, getUserAttendance);
router.route('/deleteattendance/:id').put(isUserAdmin, deleteUserAttendance);
router.route('/createattendance/:id').post(isUserAdmin, createUserAttendance);
router.route('/changeleavestatus/:id').post(isUserAdmin, changeLeaveStatus);
router.route('/createreport/').post(isUserAdmin, createReport);
router.route('/getleaves').get(isUserAdmin, getAllLeaves);
router.route('/getreports').get(isUserAdmin, getReports);

export default router;
