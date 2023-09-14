const express = require('express');
const { auth } = require('../middleweres/jwtStrategy');

const {
  get,
  getById,
  postNew,
  putEditCont,
  patchFav,
  deleteCont,
} = require('../controlers/contacts');

const router = express.Router();

router.get('/', auth, get);

router.get('/:contactId', auth, getById);

router.post('/', auth, postNew);

router.delete('/:contactId', auth, deleteCont);

router.put('/:contactId', auth, putEditCont);

router.patch('/:contactId/favorite', auth, patchFav);

module.exports = router;