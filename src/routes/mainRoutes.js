import express from 'express';
import { showAboutPage, showHomepage } from '../controllers/mainController.js';

const mainRouter = express.Router();

mainRouter.get('/', showHomepage);

mainRouter.get('/about', showAboutPage);

export default mainRouter;