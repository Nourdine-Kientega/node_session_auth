import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
        return hashedPassword;
    } catch (error) {
        throw new Error('Error while hashing password');
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword); // Compare plain password with hashed password
        return isMatch;
    } catch (error) {
        throw new Error('Error while comparing passwords');
    }
};

export { hashPassword, comparePassword };
