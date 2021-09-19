// const fs = require('fs/promises')
// const path = require('path')
// const Jimp = require('jimp')
// // const {BadRequest} = require("http-errors");

// const { User } = require('../../models')

// // const extensionList = require("./extensionList");
// const usersDir = path.join(__dirname, '../../', 'public/avatars')
// console.log('* usersDir:', usersDir)

// const updateImg = async (req, res) => { // next не пишем, бо для нього є обгортка
//   // try {
//     const { id } = req.params
//     // pathname = path.join(__dirname + base + req.url);

//     console.log('* req.file:', req.file) // старий шлях

//     /** Файл зараз знаходиться: */
//     const { path: tempPath, originalname } = req.file // дістаємо з  req.file тимчасове місце  tempPath і папку де він збережений originalname
//     console.log('*   tempPath:', tempPath)
//     // Shiera.jpg
//     // const [extension] = originalname.split(".").reverse(); // ["jpg", "Shiera"];
//     // if(!extensionList.includes(extension)){
//     //     throw new BadRequest("Недопустимое расширение файла");
//     // }
//     /** Файл повинен знаходитися: Треба сворити нове і'мя, яке складається з шляху usersDir до папки, id, імені файла  */
//     const uploadPath = path.join(usersDir, id, originalname) // req.params.id
//     console.log('* uploadPath:', uploadPath)

//   try {
//     const file = await Jimp.read(tempPath)
//     await file.resize(250, 250).write(tempPath)
//     //* * переміщуємо файл */
//     fs.rename(tempPath, uploadPath)
//     // await fs.rename(tempPath, uploadPath);   //файл переміститься , uploadPath-повний шлях

//     console.log("*'uploadPath:", uploadPath)
//     // fs.rename("/temp/file.jpg", "/public/avatars/file.jpg");   //файл переміститься
//     const avatarURL = `/public/avatars/${id}/${originalname}` // це відносний шлях
//     console.log('* avatarURL:', avatarURL)
//     //* * зберігаємо файл */
//     User.findByIdAndUpdate(id, { avatarURL })
//     await User.findByIdAndUpdate(id, { avatarURL }) // avatarURL: avatarURL/або ""/,  поле avatarURL можна замінити на шлях
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         result: avatarURL,
//       },
//     })
//   } catch (error) {
//     await fs.unlink(tempPath) // якщо не вдалось переміщення - видаляємо з тимчасового місця зберігання
//     throw error // перекидка помилки вверх, на обробку next
//   }
// }

// module.exports = updateImg

const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
// const {BadRequest} = require("http-errors");

const { User } = require('../../models')

// const extensionList = require("./extensionList");
const usersDir = path.join(__dirname, '../../', 'public/avatars')
console.log('* usersDir:', usersDir)

const updateImg = async (req, res) => {
  // try {
  const { id } = req.params
  // pathname = path.join(__dirname + base + req.url);

  console.log('* req.file:', req.file) // старий шлях

  /** Файл зараз знаходиться: */
  const { path: tempPath, originalname } = req.file // дістаємо з  req.file тимчасове місце  tempPath і папку де він збережений originalname
  console.log('*   tempPath:', tempPath)
  // Shiera.jpg
  // const [extension] = originalname.split(".").reverse(); // ["jpg", "Shiera"];
  // if(!extensionList.includes(extension)){
  //     throw new BadRequest("Недопустимое расширение файла");
  // }
  /** Файл повинен знаходитися: Треба сворити нове і'мя, яке складається з шляху usersDir до папки, id, імені файла  */
  const uploadPath = path.join(usersDir, id, originalname) // req.params.id
  console.log('* uploadPath:', uploadPath)

  try {
    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)
    console.log('*Jimp:')
    //* * переміщуємо файл */
    await fs.rename(tempPath, uploadPath)
    // await fs.rename(tempPath, uploadPath);   //файл переміститься , uploadPath-повний шлях

    console.log("*'uploadPath:", uploadPath)
    // fs.rename("/temp/file.jpg", "/public/avatars/file.jpg");   //файл переміститься
    // const avatarURL = `/public/avatars/${id}/${originalname}`; // це відносний шлях
    const avatarURL = `/avatars/${id}/${originalname}` // /public вже вказано в app
    console.log('* avatarURL:', avatarURL)
    //* * зберігаємо файл */
    User.findByIdAndUpdate(id, { avatarURL })
    await User.findByIdAndUpdate(id, { avatarURL }) // avatarURL: avatarURL/або ""/,  поле avatarURL можна замінити на шлях
    console.log('* unlink:')
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempPath) // якщо не вдалось переміщення - видаляємо з тимчасового місця зберігання
    console.log('* unlink:',)
    throw error // перекидка помилки вверх, на обробку next
  }
}

module.exports = updateImg
