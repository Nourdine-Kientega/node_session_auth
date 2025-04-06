import multer from 'multer';
import path from 'path';

// Set storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('./', '/src/uploads')); // Ensure this folder exists or modify the path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp to avoid name collisions
    }
});


// Function to return multer middleware dynamically
const uploadFile = (fieldName) => {
    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            // Allow only images (jpeg, jpg, png, gif)
            const filetypes = /jpeg|jpg|png|gif/;
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);

            if (extname && mimetype) {
                return cb(null, true);
            } else {
                return cb(new Error('Only image files are allowed!'), false);
            }
        }
    }).single(fieldName); // Make it dynamic with fieldName
};

export default uploadFile;