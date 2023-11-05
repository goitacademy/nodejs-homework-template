const multer = require("multer");
const { resolve } = require("path");

const destination = resolve("temp");

const storage = multer.diskStorage({
  destination: destination,
});

const upload = multer({});
