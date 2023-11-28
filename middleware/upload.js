const multer = require("multer");
const path = require("node:path");
const crypto = require("node:crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "tmp"));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();
    cb(null, `${basename}-${suffix}${extname}`);
  },
});

const upload = multer({ storage });


module.exports = upload;
// ця мідлвар не знає який файл до неї прийде вона по факту просто зчитала файл, змінила його ім'я і зберігла його в папку tmp
// а вже controller який обробляє HTTP запит він знає що то за запит і навіщо він потрібен і переміщає файл в потрібне місце

