import express from 'express';
import { loginUser, logoutUser, sessionUser, showLoginPage, showSignupPage, signupUser, } from '../controllers/usersController.js';
import { redirectIfLoggedIn } from '../middlewares/auth.js';

const usersRouter = express.Router();

usersRouter.get('/login', redirectIfLoggedIn, showLoginPage);

usersRouter.get('/signup', redirectIfLoggedIn, showSignupPage);

usersRouter.post('/login', loginUser);

usersRouter.post('/signup', signupUser);

usersRouter.get('/session', sessionUser);

usersRouter.post('/logout', logoutUser);

export default usersRouter;