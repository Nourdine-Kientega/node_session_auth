import dotenv from "dotenv";
import mongoose from "mongoose";
import chalk from "chalk";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);

        console.log(chalk.green('Database is successfully connected!'));
    } catch (error) {
        console.error(chalk.red('Database connection failed', error));
        process.exit(1);
    }
};

export { connectDB, mongoose };