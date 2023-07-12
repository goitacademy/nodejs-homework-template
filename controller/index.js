const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const {joiValidation, updateFavoriteSchemas} = require('../models/schemas/contact')
const { User, joiValidationRegister, joiValidationLogin } = require("../models/schemas/user");

const { createAcc, loginAcc } = require("../models/users");

const get = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 1 } = req.query;
    const skip = (page - 1) * limit;
    const result = await listContacts({ owner }, skip, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = joiValidation.validate(req.body);

    if (error) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchemas.validate(req.body);

    if (error) {
      const error = new Error("missing field favorite");
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await updateStatusContact(contactId, req.body);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
};

const create = async (req, res, next) => {
  try {
    const { error } = joiValidation.validate(req.body);

    if (error) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }
    
    const { _id: owner } = req.user;
    const result = await addContact({ ...req.body, owner });
    console.log(result);
    res.status(201).json(result);

  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
};

const register = async (req, res) => {

  const { email, password } = req.body
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      message: "Email in use",
    });
  }
 
  try {
    const { error } = joiValidationRegister.validate(req.body);

    if (error) {
      const joiError = new Error(error.details[0].message);
      joiError.status = 400;
      throw joiError;
    }
    

    const newUser = await createAcc(req.body);
    newUser.setPassword(password)
    await newUser.save()

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
    
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = joiValidationLogin.validate(req.body);

    if (error) {
      const joiError = new Error(error.details[0].message);
      joiError.status = 400;
      throw joiError;
    }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "Email or password is wrong",
        });
      }

      const passwordCompare = await bcryptjs.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(401).json({
          message: "Email or password is wrong",
        });
      }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    const logUser = await loginAcc(req.body);

    res.status(200).json({
      token,
      user: {
        email: logUser.email,
        subscription: logUser.subscription
      }
    });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  
  res.json({
    email,
    subscription
  })
};

const logout = async (req, res) => {
  const { _id, email, subscription } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({
    email,
    subscription,
  });
}

module.exports = {
  get,
  getById,
  remove,
  update,
  create,
  updateFavorite,
  register,
  login,
  getCurrent,
  logout
};
