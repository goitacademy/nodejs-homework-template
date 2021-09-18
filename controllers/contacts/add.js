const fs = require('fs/promises')
const path = require('path')
///const gravatar = require('gravatar')

const { Contact } = require('../../models')

const contactsDir = path.join(__dirname, "../../", "public/avatars");
console.log("** contactsDir:", contactsDir);
 
const add = async (req, res) => {
    const defaultAvatarURL = gravatar.url('taras__1@gmail.com', { s: '250' }, true)
    // const defaultAvatarURL = gravatar.url(req.body.email, {s: "250"}, true);
    const newContact = { ...req.body, avatarURL: defaultAvatarURL }  // ...req.body - contact з фронтенда, avatarURL:- поле avatarURL з user.js(папка models)
    
    /** 1. добавляємо товар і якщо він добавався */
    const result = await Contact.create(req.body); //зберігаємо contact в базі
    ///const result = await Contact.create(newContact);
    console.log("** result._id:", result._id, "** result:", result);
    const id = result._id.toString();
    console.log("** id:", id);
    /** 2. беремо шлях до папки "public/avatars";  3. добавляємо  _id   */
    // const dirPath = path.join(contactsDir, result._id);
    const dirPath = path.join(contactsDir, id); //створюєм ім'я папки
    /** 4. створюємо папку в public/avatars (на всяк випадок) щоб потім через updateImg.js котролллера записати все*/
    // await fs.mkdir(dirPath);   //const uploadDir = await fs.mkdir(dirPath);
    console.log("** dirPath:", dirPath);
    await fs.mkdir(dirPath); //створюєм папку
    console.log("**'dirPath:", dirPath);
    /** відправка відповіді */
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result,
        },
    });
};

module.exports = add
