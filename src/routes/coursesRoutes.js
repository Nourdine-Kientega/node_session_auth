import express from 'express';
import { addCourse, getAllCourses, getOneCourse, showAddCourse } from '../controllers/coursesController.js';
import uploadFile from '../utils/uploadFile.js';
import { isLoggedIn } from '../middlewares/auth.js';

const courseRouter = express.Router();

courseRouter.get('/add_course', showAddCourse);

courseRouter.post('/add_course', uploadFile('image'), addCourse);

courseRouter.get('/read_course/:id', isLoggedIn, getOneCourse);

courseRouter.get('/courses', getAllCourses);

export default courseRouter;