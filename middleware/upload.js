const multer = require("multer");
const path = require("path");
const { createCustomError } = require("../helpers");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../tmp"),
  filename: function (req, file, cd) {
    cd(null, `${req.user._id}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    const err = createCustomError(401, "Uploaded file must be image!");
    cb(err, false);
  },
});

module.exports = upload;
