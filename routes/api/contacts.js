const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { getAll, getById, add, removeById, updateById, updateByFavorite } = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { bodySchema, updateByFavoriteSchema } = require('../../schemas/contacts.js');
const User = require('./schemas/contacts.js');
const router = express.Router();
const secret = "React App";
const auth = (requirement, response, next) => {
    passport.authenticate('jwt', { session: false }, (erro, contact) => {
      if (!contact || erro) {
        return response.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        });
      }
      requirement.contact = contact;
      next();
    })(requirement, response, next);
  };
router.get("/", getAll);
router.get("/:contactId", isValidId, getById);
router.get('/list', auth, (requirement, response, next) => {
    const { username } = requirement.contact;
    response.json({
      status: 'success',
      code: 200,
      data: {
        message: `Authorization was successful: ${username}`,
      },
    });
  });
router.post("/", validateBody(bodySchema),add);
router.post('/registration', async (requirement, response, next) => {
    const { username, email, password } = requirement.body;
    const contact = await User.findOne({ email });
    if (contact) {
      return response.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }
    try {
      const newUser = new User({ username, email });
      newUser.setPassword(password);
      await newUser.save();
      response.status(201).json({
        status: 'success',
        code: 201,
        data: {
          message: 'Registration successful',
        },
      });
    } catch (error) {
      next(error);
    }
  });
  router.post('/login', async (requirement, response, next) => {
    const { email, password } = requirement.body;
    const contact = await User.findOne({ email });
  
    if (!contact || !contact.validPassword(password)) {
      return response.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login or password',
        data: 'Bad request',
      });
    }
  
    const payload = {
      id: contact.id,
      username: contact.username,
    };
  
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    response.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    });
  });
router.delete("/:contactId", isValidId, removeById);
router.put("/:contactId", isValidId, validateBody(bodySchema), updateById);
router.patch("/:contactId/favorite", isValidId, validateBody(updateByFavoriteSchema),updateByFavorite);

module.exports = router;
