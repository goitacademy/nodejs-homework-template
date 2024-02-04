const path = require("node:path");
const crypto = require("node:crypto");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    
    cb(null, path.join(__dirname, "..", "tmp"));
  },
  filename: (req, file, cb) => {
    // file.originalname: TrevorPhilips-GTAV.png
    const extname = path.extname(file.originalname); // .png
    const basename = path.basename(file.originalname, extname); // TrevorPhilips-GTAV
    const suffix = crypto.randomUUID();

    cb(null, `${basename}-${suffix}${extname}`);
  },
});

module.exports = multer({ storage });