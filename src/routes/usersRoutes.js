import express from 'express';
import { loginUser, showLoginPage, showSignupPage, signupUser, } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/login', showLoginPage);

usersRouter.get('/signup', showSignupPage);

usersRouter.post('/login', loginUser);

usersRouter.post('/signup', signupUser);

export default usersRouter;