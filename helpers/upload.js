const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { HttpCodes, Limits } = require("./constants");

// Configuring path where the image will be temporary uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    // Renaming the file to make sure it is unique. Not creating new folders for each user.
    // Using uuid to make somth different from using Date.now()
    // Not using users id, because if the user uploads different avatars but with the same name, they get deleted altogether
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: Limits.imageSize },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }

    const error = new Error("Wrong avatar format!");
    error.status = HttpCodes.BAD_REQUEST;
    cb(error);
  },
});

module.exports = upload;