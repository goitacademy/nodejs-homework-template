const multer = require('multer');
const { multerConfig } = require('../lib');

const upload = multer({
    storage: multerConfig
});

module.exports = upload;