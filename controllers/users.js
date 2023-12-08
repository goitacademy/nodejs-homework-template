const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../service/schemas/userSchema");
const updateAvatar = require("./updateAvatar");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

async function sendVerificationEmail(user) {
  try {
    const verificationToken = user.verificationToken;
    const verificationLink = `${process.env.HOST}/api/users/verify/${verificationToken}`;
    console.log("Verification link:", verificationLink);

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    // Дополнительная проверка подключения к почтовому серверу
    await transporter.verify();
    console.log("Server is ready to take our messages");

    const message = {
      to: user.email,
      from: "m.chukhrai@gmail.com",
      subject: "Email Verification",
      html: `<p>Click the following link to verify your email: ${verificationLink}</p>`,
    };

    // Дополнительная информация перед отправкой письма
    console.log("Sending verification email to:", user.email);

    await transporter.sendMail(message);

    // Дополнительная информация после успешной отправки
    console.log("Verification email sent successfully to:", user.email);
  } catch (error) {
    // Логирование ошибок, если они возникают
    console.error("Error sending verification email:", error);
    throw error; 
  }
}

async function registerUser(req, res, next) {
  try {
    // Валидация запроса
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Проверка, не используется ли уже email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Хеширование пароля
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Генерація токену підтвердження
    const verificationToken = uuidv4();

    // Создание нового пользователя
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: "starter",
      verificationToken,
    });

    // Сохранение пользователя в базе данных
    await newUser.save();

    // Отправка email з посиланням для верифікації
    await sendVerificationEmail(newUser);

    // Отправка успешного ответа
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res, next) {
  try {
    // Валидация запроса
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Поиск пользователя по email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Создание токена
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    // Сохранение токена в пользователе
    user.token = token;
    await user.save();

    // Отправка успешного ответа
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logoutUser(req, res, next) {
  try {
    // Получаем ID пользователя из токена
    const userId = req.user.id;

    // Находим пользователя по ID
    const user = await User.findById(userId);

    // Проверяем, существует ли пользователь
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Проверяем, что токен в запросе соответствует токену в базе данных
    if (
      req.headers.authorization.split(" ")[1].localeCompare(user.token) !== 0
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized: Token mismatch" });
    }

    // Выводим данные о пользователе и токене перед удалением
    console.log("User before logout:", user);

    // Удаляем токен у пользователя
    delete user.token;

    // Сохраняем изменения в базе данных
    await user.save();

    // Отправляем успешный ответ
    res.status(204).end();

    // Выводим данные о пользователе после удаления токена
    console.log("User after logout:", user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || token !== user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
}

async function verificationToken(req, res) {
  console.log("Verification route hit");
  const { verificationToken } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { verificationToken },
      { $set: { verify: true, verificationToken: null } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Отправка листа для верифікації email типу "вдячність"
    // await sendVerificationEmail(user);

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function resendVerificationEmail(req, res) {
  try {
    const { email } = req.body;

    // Валідація email
    const { error } = Joi.string().email().required().validate(email);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Знайти користувача за email
    const user = await User.findOne({ email });

    // Перевірити, чи користувач існує
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Перевірити, чи користувач вже пройшов верифікацію
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    // Повторно відправити лист для верифікації
    await sendVerificationEmail(user);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error resending verification email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  verificationToken,
  resendVerificationEmail,
  updateAvatar,
};
