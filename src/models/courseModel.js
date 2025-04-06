import mongoose from "mongoose";

// Define the schema for the course
const courseSchema = new mongoose.Schema(
    {
        image: {
            type: String, // Assuming CoursesImages is a path or URL
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

// Create the model using the schema
const Course = mongoose.model('Course', courseSchema);

export default Course;