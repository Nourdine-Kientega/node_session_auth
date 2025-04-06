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
            res.status(400).redirect('/login');
            // return res.status(400).json({ message: 'User not found' });
        }

        // Compare the password with the hashed password stored in the database
        const isPasswordValid = await comparePassword(password, existingUser.password);

        if (!isPasswordValid) {
            res.status(400).redirect('/login');
            // return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If the password is valid, you can send a success response
        // Optionally, you can also generate a JWT token and send it back to the client for authenticated sessions.
        // Crée la session
        // req.session.user = {
        //     email: existingUser.email,
        //     username: existingUser.username
        // };


        // if (stay_logged) {
        //     // La session expire après 5 minutes si "Rester connecté" est coché
        //     req.session.cookie.maxAge = 1000 * 60 * 5;  // 5 minutes
        // } else {
        //     // Pas de maxAge défini => expire à la fermeture du navigateur
        //     req.session.cookie.maxAge = null;  // Expire à la fermeture du navigateur
        // }

        res.status(400).redirect('/');
        // res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { showLoginPage, showSignupPage, loginUser, signupUser };