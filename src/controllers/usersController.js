import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

const showLoginPage = (req, res) => {

    res.render('login', { title: 'Login' });
};

const showSignupPage = (req, res) => {

    res.render('signup', { title: 'Signup' });
};

const signupUser = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists', alreadyExistingEmail: true });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        req.session.user = {
            username: newUser.username,
            email: newUser.email,
        };

        res.status(200).redirect('/');
        // res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};


const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Check if user exists in the database
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            res.redirect('/login');
            // return res.status(400).json({ message: 'User not found' });
        }

        // Compare the password with the hashed password stored in the database
        const isPasswordValid = await comparePassword(password, existingUser.password);

        if (!isPasswordValid) {
            res.redirect('/login');
            // return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.user = {
            username: existingUser.username,
            email: existingUser.email,
        };

        res.redirect('/');
        // res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.redirect('/login'); // Or return a success response
    });
};

const sessionUser = (req, res) => {

    if (req.session.user) {
        // If user is logged in, return their username
        return res.json({ username: req.session.user.username });
    } else {
        // If no user session, return a message indicating not logged in
        return res.json({ username: null });
    }
};

export { showLoginPage, showSignupPage, loginUser, signupUser, sessionUser, logoutUser };