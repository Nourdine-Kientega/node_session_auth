import express from 'express';
import { loginUser, logoutUser, sessionUser, showLoginPage, showSignupPage, signupUser, } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/login', showLoginPage);

usersRouter.get('/signup', showSignupPage);

usersRouter.post('/login', loginUser);

usersRouter.post('/signup', signupUser);

usersRouter.get('/session', sessionUser);

usersRouter.post('/logout', logoutUser);

export default usersRouter;