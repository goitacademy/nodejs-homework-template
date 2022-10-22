const service = require("../servisce");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const get = async (req, res, next) => {
  const { id } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = parseInt(page) > 1 ? (page - 1) * limit : 0;
  try {
    const contacts = await service.getAllContacts({
      owner: id,
      skip,
      limit,
      favorite,
    });
    return res
      .status(200)
      .json({ data: contacts, amount: contacts.length, page, limit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res, next) => {
  const { id } = req.user;
  try {
    const contact = await service.getByIdContact({
      id: req.params.id,
      owner: id,
    });
    if (contact) {
      res.status(200).json(contact);
      return;
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res, next) => {
  const { id } = req.user;
  try {
    const newContact = await service.createContact({ ...req.body, owner: id });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res, next) => {
  const { id } = req.user;
  try {
    const data = await service.removeContact({ id: req.params.id, owner: id });
    if (data) {
      res.status(200).json({ message: "contact deleted" });
      return;
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const owner = req.user.id;
  const { id } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const putContact = await service.updateContact({ id, body, owner });
    res.status(200).json(putContact);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed for value")) {
      res.status(400).json({ message: `Not found this id: ${id}` });
      return;
    }

    res.status(404).json({ message: error.message });
  }
};

const favorite = async (req, res) => {
  const owner = req.user.id;
  const { id } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    }

    const data = await service.updateStatusContact({ id, body, owner });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

/* ---------------------------------------------------------
---------------------------/users/------------------------ 
-----------------------------------------------------------*/

/*============================ SIGNUP==================== */
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    /* Перевіряємо є такий користувач у БД */
    const user = await service.validateEmail(email);
    if (user) {
      res.status(409).json({ message: "Email in use" });
      return;
    }

    /* Шифруємо пароль */
    const hashPassword = await bcrypt.hash(password, 10);
    /* Створюємо нового користувача */
    const result = await service.createUser({ email, password: hashPassword });

    /* Відправляємо відповідь */
    res.status(201).json({
      user: {
        email: result.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*======================= LOGIN====================== */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    /* Проверяем есть ли такой пользователь в БД */
    const user = await service.validateEmail(email);
    if (!user) {
      res
        .status(401)
        .json({ message: `User not found with this email ${email}` });
      return;
    }

    /* Проверяем пароль сходиться */
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(401).json({ message: "The password is wrong" });
      return;
    }

    /* Создаем токен */
    const payload = { id: user["_id"], subscription: user.subscription };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    /* Обновляем токен в БД */
    const result = await service.updateUserToken({ id: user["_id"], token });

    /* Отправляем ответ пользователю */
    res.status(200).json({
      token: result.token,
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*=========================== LOGOUT================= */
const logout = async (req, res) => {
  const { id } = req.user;
  try {
    await service.updateUserToken({ id, token: "" });
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*=========================== CURRENT================= */
const current = async (req, res) => {
  const { email, subscription } = req.user;
  try {
    res.status(200).json({ email, subscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*=========================== CURRENT================= */
const subscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  try {
    const {
      _id,
      email,
      subscription: newSub,
    } = await service.updateSubscription({ id, subscription });
    res.status(200).json({ _id, email, subscription: newSub });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  favorite,
  signup,
  login,
  logout,
  current,
  subscription,
};
