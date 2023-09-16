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
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  // якщо немає хешую пароль
  const hashPassword = await bcrypt.hash(password, 10);

  // тимчасовий avatar
  const avatarUrl = gravatar.url(email);
  // додаємо код верифікації
  const verificationToken = nanoid();
  // стоврюю нового Юзера з мейлом та хешованим паролем
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });
  // створюємо емейл на підтвердження
  const verifyEmail = {
    to: email,
    subject: "verify email", 
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click for verify email</a>`,
  };
// відправляю емейл на підтвердження
  await sendEmail(verifyEmail);

  // відправляю відповідь, що користувач створений
  res.status(201).json({
    email: newUser.email,
  });
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    console.log("verificationToken", verificationToken);
  // відправляю запит на mongoDB та шукаю юзера з таким токеном
    const user = await User.findOne({ verificationToken });
    console.log("user", user);
  // перевіряю чи є такий токен
  if (!user) {
    throw HttpError(404, "User not found");
    }
    // оновлюємо юзера та підтверджуємо верифікацію
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
    // відправляємо повідомлення що верифікація пройдена 
     res.status(200).json({
       message: "Verification successful",
     });
}

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email")
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "Verification has already been passed");
  }
  // знов створюємо емейл на підтвердження
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click for verify email</a>`,
    };

    
}


  // відправляю відповідь, що користувач створений
   res.status(200).body({ email: email }).json({
     message: "Verification email sent",
   });
};


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