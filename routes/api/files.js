const express=require('express');
const router = express.Router();
const uploadController = require('../../controller/filesController/filesController')
// const userAvatarController =  require('../../controller/filesController/userAvatarController')
const filesController =require('../../controller/filesController/filesController')
const multer = require('multer')
const path= require('path')
const { v4: uuidv4 } = require('uuid');

const FILE_DIR=path.resolve('./tmp')

const storage = multer.diskStorage({
    destination:(req,file, cb)=>{
cb(null,FILE_DIR )
 },
    filename:(req,file, cb)=>{
const [, extension]= file.originalname.split('.');
   cb(null,`${uuidv4()}.${extension}`)
},
    
})//инийц

const uploadMiddlware = multer({storage})
// router.post('/',uploadMiddlware.single('avatar'), uploadController)
  router.post('/upload',uploadMiddlware.single('avatar'), uploadController)
router.use('/download', express.static(FILE_DIR))
//router.post('/users/avatars', login)
// router.patch('/users/avatars',uploadMiddlware.single('avatar'), uploadController)

module.exports = router;
