const path = require("path")

function checkFilesExtension(req, res, next) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    // console.log('req.file', req.file)
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({ error: 'Invalid file extension.' });
    }

    next();
}

module.exports = checkFilesExtension;
