const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const gravatar = require('gravatar') 
const path = require("path");
const fs = require("fs/promises")
const Jimp = require ("jimp")

// імпортую модель
const { User } = require("../models/user");
// обробник помилок і обгортка для try&catch
const { HttpError, ctrlWrapper } = require("../helpers");


// витягую секрет з .env
const { SECRET_KEY } = process.env;

// шлях до аватарок
const avatarDir = path.join(__dirname, "../", "public", "avatars");

// запит реєстрації
const register = async (req, res) => {
    // з реквеста отримую емейл та пароль
    const { email, password } = req.body;
// відправляю запит на mongoDB та перевіряю чи є така пошта
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Email already in use");
    }
    // якщо немає хешую пароль
    const hashPassword = await bcrypt.hash(password, 10);

    // тимчасовий avatar
    const avatarUrl = gravatar.url(email)
    // стоврюю нового Юзера з мейлом та хешованим паролем
    const newUser = await User.create({...req.body, password: hashPassword, avatarUrl})

    // відправляю відповідь, що користувач створений
    res.status(201).json({
        email: newUser.email
    })
    
}

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");  
    }
    // переверію правильність захешованого пароля з введеним паролем
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");          
    }

    const payload = {id: user._id}
    // створюю токен    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    // записую токен до об"єкту
    await User.findByIdAndUpdate(user._id, { token })
    // повертаю токен

    res.json({
        token: token,
    })

}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({email, subscription})
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" }) 
    res.json({message: "Logout success"})
}


const updateAvatar = async (req, res) => {
    
    const { _id } = req.user; 
    const { path: tempUpload, originalname } = req.file;
    // зменшую розмір аватарки
    const image = await Jimp.read(tempUpload);
    const newHeight = Jimp.AUTO;
    await image.resize(250, newHeight).write(tempUpload);
    // записуємо унікальне ім"я для авки
    const fileName = `${_id}_${originalname}` 

    // cтворюємо папку для зберігання аватарок
    const resultUpload = path.join(avatarDir, fileName);
    // переміщуємо 
    await fs.rename(tempUpload, resultUpload);
    // записуємо аватарУРЛ
    const avatarUrl = path.join("avatars", fileName);
    // оновлення аватарки
    await User.findByIdAndUpdate(_id, { avatarUrl });
    
    res.json(avatarUrl, )
    

}





module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),

  updateAvatar: ctrlWrapper(updateAvatar),

};