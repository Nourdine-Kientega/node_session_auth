import express from 'express';
import { showAboutPage, showAdminPage, showHomepage } from '../controllers/mainController.js';
import { isAdmin } from '../middlewares/auth.js';

const mainRouter = express.Router();

mainRouter.get('/', showHomepage);

mainRouter.get('/about', showAboutPage);

mainRouter.get('/admin', isAdmin, showAdminPage);

export default mainRouter;