// const express = require('express')
// const multer = require('multer')
// const path = require('path')
// const router = express.Router();



// const tempDir = path.join(__dirname, 'temp')

// const multerConfig = multer.diskStorage({
//     destination: tempDir,
//     filename: (req, file, cb) => {
//         cb(null,file.originalname)
//     },

//     limits: {
//         fileSize:2048
//     }
// })

// const uploadMiddlewar = multer({
//   storage: multerConfig,
// });

// router.post("/", uploadMiddlewar.single("avatar"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });

// module.exports = router;


// module.exports = {multerConfig}