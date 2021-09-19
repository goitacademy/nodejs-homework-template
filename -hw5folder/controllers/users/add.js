// const fs = require('fs/promises')
// const path = require('path')
// const gravatar = require('gravatar')

// const { User } = require('../../models')

// const usersDir = path.join(__dirname, '../../', 'public/avatars')
// console.log('** usersDir:', usersDir)

// const add = async (req, res) => { // next не пишем, бо для нього є обгортка
//   const defaultAvatarURL = gravatar.url('taras__1@gmail.com', { s: '250' }, true)
//   // const defaultAvatarURL = gravatar.url(req.body.email, {s: "250"}, true);
//   const newUser = { ...req.body, avatarURL: defaultAvatarURL } // ...req.body - user з фронтенда, avatarURL:- поле avatarURL з user.js(папка models)

//   /** 1. добавляємо товар і якщо він добавався */
//   /// const result = await User.create(req.body); //зберігаємо user в базі
//   const result = await User.create(newUser)
//   console.log('** result._id:', result._id, '** result:', result)
//   const id = result._id.toString()
//   console.log('** id:', id)
//   /** 2. беремо шлях до папки "public/avatars";  3. добавляємо  _id   */
//   // const dirPath = path.join(usersDir, result._id);
//   const dirPath = path.join(usersDir, id) // створюєм ім'я папки
//   /** 4. створюємо папку в public/avatars (на всяк випадок) щоб потім через updateImg.js котролллера записати все */
//   // await fs.mkdir(dirPath);   //const uploadDir = await fs.mkdir(dirPath);
//   console.log('** dirPath:', dirPath)
//   await fs.mkdir(dirPath) // створюєм папку
//   console.log("**'dirPath:", dirPath)
//   /** відправка відповіді */
//   res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       result,
//     },
//   })
// }

// module.exports = add

const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')

const { User } = require('../../models')

const usersDir = path.join(__dirname, '../../', 'public/avatars')
console.log('** usersDir:', usersDir)

const add = async (req, res) => {
  // const defaultAvatarURL = gravatar.url(
  //     "taras001@gmail.com",
  //     { s: "250" },
  //     true
  // );
  console.log('** req.body.email:', req.body.email)
  const defaultAvatarURL = gravatar.url(req.body.email, { s: '250' }, true)
  console.log('** defaultAvatarURL:', defaultAvatarURL)
  const newUser = { ...req.body, avatarURL: defaultAvatarURL } // `http:${defaultAvatarURL}` // ...req.body - user з фронтенда, avatarURL:- поле avatarURL з user.js(папка models)

  /** 1. добавляємо товар і якщо він добавався */
  /// const result = await User.create(req.body) // зберігаємо user в базі
  const result = await User.create(newUser)
  console.log('** result._id:', result._id, '** result:', result)

  const id = result._id.toString()
  console.log('** id:', id)

  /** 2. беремо шлях до папки "public/avatars";  3. добавляємо  _id   */
  // const dirPath = path.join(usersDir, result._id);
  const dirPath = path.join(usersDir, id) // створюєм ім'я папки
  console.log('** dirPath:', dirPath)

  /** 4. створюємо папку в public/avatars (на всяк випадок) щоб потім через updateImg.js котролллера записати все */
  // await fs.mkdir(dirPath);   //const uploadDir = await fs.mkdir(dirPath);
  await fs.mkdir(dirPath) // створюєм папку
  console.log("**mkdir 'dirPath:", dirPath)

  /** відправка відповіді */
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = add
