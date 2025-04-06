import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import mainRouter from './src/routes/mainRoutes.js';
import usersRouter from './src/routes/usersRoutes.js';
import { connectDB } from './src/config/database.js';
import expressEjsLayouts from 'express-ejs-layouts';
import courseRouter from './src/routes/coursesRoutes.js';
import session from 'express-session';

dotenv.config();

// Connect mongodb atlas
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', 'views');

// Session configuration
app.use(session({
    name: process.env.SESSION_NAME, // Session name from .env file
    secret: process.env.SESSION_SECRET, // Secret key from .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join('./', '/src/uploads')));
app.use(expressEjsLayouts);
app.use(mainRouter, usersRouter, courseRouter);

app.listen(port, () => console.log(chalk.green(`Server is running on http://localhost:${port}`)));
