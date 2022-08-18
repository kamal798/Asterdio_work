const multer = require('multer');
const path = require('path')

const filePath = '../Server/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath) // null denotes the error, second argument denotes the actual destination and third is file name.
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

module.exports = multer({
    storage,
    limits: { fileSize: 100000000},
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /jpg|jpeg|png/;
        const validateExt = allowedExtensions.test((path.extname(file.originalname)).toLowerCase());
        const validateMime = allowedExtensions.test(file.mimetype);
        if(validateExt && validateMime)
            cb(null, true);
        else
            cb('Image only');

    }
})