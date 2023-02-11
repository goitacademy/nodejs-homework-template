const express = require('express');
const router = express.Router();
const contactsController = require('../../controller/contactsController');
const passport = require('passport');

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.get('/', auth, contactsController.get);

router.get('/:id', contactsController.getById);

router.post('/', contactsController.create);

router.delete('/:id', contactsController.removeById);

router.put('/:id', contactsController.update);

router.patch('/:id/favorite', contactsController.updateStatus);

module.exports = router;
