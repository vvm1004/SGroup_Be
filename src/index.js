import express from 'express';
import { connection } from './database/config.js';
import routers from './apis/access/index.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url'; // Import fileURLToPath function
import { dirname, join } from 'path'; // Import dirname and join functions from path module
import errorHandler from './middleware/errorHandel.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler)
app.use('/api', routers);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Serve uploaded images statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/images', express.static(join(__dirname, 'images')));

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, join(__dirname, 'images/')); // Adjust the destination path as needed
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploadStorage = multer({ storage: storage })


// Single file upload endpoint
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
    console.log(req.file);
    return res.send("Single file uploaded");
});

// Multiple files upload endpoint (up to 10 files)
app.post("/upload/multiple", uploadStorage.array("files", 10), (req, res) => {
    console.log(req.files);
    return res.send("Multiple files uploaded");
});

(async () => {
    try {
        await connection.getConnection();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();