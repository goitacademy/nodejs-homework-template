const { HttpError } = require("../helpers");
const isFile = async (req, res, next) => {
next(req.file ? null : HttpError(400, 'Image required!'));
}
module.exports = isFile;