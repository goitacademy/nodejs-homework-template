const multer = require('multer')
//const jimpPath = require('./jimpPath')
const path= require('path')
const { v4: uuidv4 } = require("uuid");

const FILE_TMP = path.join(__dirname, "../", "tmp"); 
console.log('FILE_TMP',FILE_TMP)
const storage = multer.diskStorage({
      destination:(req,file, cb)=>{
  cb(null,FILE_TMP)
   },
      filename:(req,file, cb)=>{
          const [, extension] = file.originalname.split('.');
      cb(null, `${uuidv4()}.${extension}`);
  //cb(null,file.originalname)
  },
  })//инийц
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null,FILE_TMP);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
    // limits: {
    //   fileSize: 1048576,
    // },
  
  const upload = multer({
    storage: storage,
  });

  
  module.exports=upload



// const storage = multer.diskStorage({
//     destination:(req,file, cb)=>{
// cb(null,FILE_TMP)
//  },
//     filename:(req,file, cb)=>{
//         const [, extension] = file.originalname.split('.');
//     cb(null, `${uuidv4()}.${extension}`);
// //cb(null,file.originalname)
// console.log(' req',req)
// console.log('file',file)
// },
// })//инийц
// const multerFunction = multer({
//     storage: storage
//   });
