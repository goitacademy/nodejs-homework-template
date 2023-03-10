const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
  filename: (req, file, cd) => {
      
    console.log("file", file);
        cd(null, file.originalname);
    }
});

const upload = multer({
  storage: multerConfig
});

module.exports = upload;


  // //---------------------------
  // const name = filename.split(".")[0];

  // console.log("name", name);

  // const formatFile = Jimp.read(filename, (err, name) => {
  //   if (err) {
  //     return HttpErorr(err);
  //   }
  //   name.resize(250, 250); // зміна розміру
  // });

  // console.log(formatFile);
  // //---------------------------