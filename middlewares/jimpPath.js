
// const path= require('path');
// const Jimp = require("jimp");
// const { v4: uuidv4 } = require('uuid');


// const FILE_DIR=path.resolve("./public/avatars");
//  console.log('FILE_DIR',FILE_DIR)
//  const [name, extension]= file.originalname.split('.');
//  const newName= `${name}-${uuidv4()}-${extension}`
//  const newPath = path.join(FILE_DIR,newName)   
 
//  const jimpPath = Jimp.read(newPath, async(err, userAvatar) => {
//      if (err) throw err;
//      userAvatar
//        .resize(250, 250) // resize
//        .quality(60) // set JPEG quality
//        .greyscale() // set greyscale
//        .write(newPath); // save
//        await fs.unlink(path);
//    });


// // const jimpPath = () => {
// //  const [name, extension]= file.originalname.split('.');
// // const newName= `${name}-${uuidv4()}-${extension}`
// // const newPath = path.join(FILE_DIR,newName)   

// // const newPathAvatar = Jimp.read(newPath, async(err, userAvatar) => {
// //     if (err) throw err;
// //     userAvatar
// //       .resize(250, 250) // resize
// //       .quality(60) // set JPEG quality
// //       .greyscale() // set greyscale
// //       .write(newPath); // save
// //       await fs.unlink(path);
// //   });
// console.log('newPathAvatar',newPathAvatar)
// // return newPathAvatar
// // }
// module.exports=jimpPath
