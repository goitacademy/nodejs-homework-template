const multer = require("multer");
const path = require("path");
const HttpError = require("../helpers/HttpError");

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const { _id: id } = req.user;
    const newName = `${id}_${file.originalname}`;
    cb(null, newName);
  },
});

const limits = { fileSize: 1024 * 1024 };

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;

  if (
    mimetype !== "image/jpeg" &&
    mimetype !== "image/png" &&
    mimetype !== "image/jpg"
  ) {
    cb(new HttpError(400, "Invalid file"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
