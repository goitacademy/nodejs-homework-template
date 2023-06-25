const express = require('express')

const {
  createUser,
  getUsersList,
  getUserById,
  updateUserById,
  deleteUserById, 
  getMe} = require('../../controllers/users');
const { checkUserById, checkCreateUserData, checkUpdateUserData } = require('../../middlewares/userMiddlewares');
const { protect, allowFor } = require('../../middlewares/authMiddlewares');
const userRolesEnum = require('../../constants/userRolesEnum');

const router = express.Router();

// router.post('/', createUser);
// router.get('/', getUsersList);
// router.get('/:id', checkUserById, getUserById);
// router.patch('/:id', checkUserById, updateUserById);
// router.delete('/:id', checkUserById, deleteUserById);

// router.use(protect);
router.get('/current', protect, getMe)
router.use(allowFor(userRolesEnum.BUSINESS, userRolesEnum.PRO));
router.post('/', createUser)
router.get('/', getUsersList);

// router.use('/:id', checkUserById);
  router.get('/:id', checkUserById, getUserById)
  router.patch('/:id', checkUpdateUserData, updateUserById)
  router.delete('/:id', deleteUserById);

module.exports = router;