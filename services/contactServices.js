const { Types } = require("mongoose");
const { Contact } = require("../models/contact");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");                                      // пакет для генерації аватара по емейл
const path = require("path");           
const fs = require("fs/promises");                                         // відмовідає за всі операції з файлами
const Jimp = require("jimp");                                                // пакет для обробки зображення (якщо, напр. користувач буде присилати велике зобр) 

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");        // створюємо шлях ...public/avatars

const { subscrENUM } = require("../constants/userRolesEnum");

// створення нового контакта
exports.createContact = async (userData, user) => {
  const { _id: owner } = user;
  const newContact = await Contact.create({ ...userData, owner });

  newContact.password = undefined;

  return newContact;
};

// отримання усіх контактів
// exports.getAllContacts = () => Contact.find().select("+password"); // .lean() - щоб поубирати лишні прототипи
exports.getAllContacts = async (user, query) => {
  const { _id: owner } = user;
 
  const { page = 1, limit = 20 } = query; // погінація
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit}).populate("owner", "name email");

  return result
} 
 
// отримання одного контакту
exports.getOneContact = (id) => {
  const result = Contact.findById(id);

  if (!result) {
     throw HttpError(404, "Not found");
  }
  return result;
}

// поновлення контакта по id
exports.updateContact = async (id, contactData) => {
  const contact = await Contact.findById(id);

  Object.keys(contactData).forEach((key) => {
    contact[key] = contactData[key];
  });

  return contact.save();
};

// меняє логічне значенния поля favorite на протилежне (true false)
exports.updateStatus = async (id) => {
    const contact = await Contact.findById(id);
 
    contact.favorite = !contact.favorite;
    return contact.save();
}

// видаляє контакт по id
exports.deleteContact = (id) => Contact.findByIdAndDelete(id);

// перевіряє чи є такий контакт. Якщо є, то видає помилку, що такий є
exports.checkContactExists = async (filter) => {     // filter - параметр, по якому потрібно перевіряти чи є такий контакт
  const contactExists = await Contact.exists(filter);

  if (contactExists) throw new HttpError(409, "Contact exists");
};

// перевіряємо, чи є контакт з таким id
exports.checkContactExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);  // чи валідний id

  if (!idIsValid) throw new HttpError(404, "Contact not found.."); 

//   const contactExists = await Contact.exists({ _id: id });
  const contactExists = await Contact.findById(id);

  if (!contactExists) throw new HttpError(404, "Contact not found..");
};

/***
 * @приймає req.body
 * @робить реєструє користувача
 * @вертає користувача, якщо з таким емейлом немає ще в бд
 */
exports.signup = async (userdata) => {
  const { email, password } = userdata;

  const user = await User.findOne({ email });
  
   if (user) {
     throw HttpError(409, "Email in use");
     
   }
  
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);                                     // створюємо аватарку автоматично
  
  const newUser = await User.create({
    ...userdata,
    password: hashPassword,
    avatarURL,
  });
  
  
  return newUser;
};


/***
 * @приймає req.body
 * @робить авторизує користувача
 * @вертає користувача, якщо такий є і новий токен для нього
 */
exports.login = async (email, password) => {
  
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
     throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  return {user, token}
}

/***
 * @робить удаляє токен для користувача для розлогінення
 */
exports.logOut = async(user) => {
  const { _id } = user;

  const result = await Contact.findByIdAndUpdate(_id, { token: '' });

  return "Logout success";
}

exports.getCurrent = (user) => {
  const { email, subscription } = user;
  
  return { email, subscription };
}

exports.updateSubscription = (user, newData) => {
  const isSubscription = newData.subscription ? true : false;

  if (!isSubscription) {
    throw HttpError(401, "the subscription field is not selected");
  }

  const a = Object.values(subscrENUM).find((i) => i === newData.subscription);
  
  if (a === undefined) {
    throw HttpError(401, "there is no such thing in the list");
  }

  user.subscription = newData.subscription;

  return user.save()

}

exports.updateAvatar = async (user, file) => {
  const { _id } = user;

  const { path: tempUpload, originalname } = file; // витягуємо старий шлях та старе імя файла

  const filename = `${_id}_${originalname}`; // створюємо для файла нове імя
  const resultUpload = path.join(avatarsDir, filename); // створюємо новий шлях + назва нового файлу

 // змінюємо розмір файла
   Jimp.read(tempUpload)
     .then((avatarka) => {
       avatarka.resize(250, 250).write(resultUpload); // resize
     })
     .catch((err) => {
       console.error(err);
     });
  



   await fs.rename(tempUpload, resultUpload); // переміщуємо файл зі старого шляху в новий
  const avatarURL = path.join("avatars", filename); // створюємо новий шлях для картинки

  await User.findByIdAndUpdate(_id, { avatarURL }); // для користувача з id перезаписуємо на новий шлях аватар

  return user.save();
};

