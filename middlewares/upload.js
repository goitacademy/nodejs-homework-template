const multer = require("multer");
const 

const storage = multer.diskStorage({
  destination: "",
});

const upload = multer({});
