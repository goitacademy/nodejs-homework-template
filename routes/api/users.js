const express = require("express")
const UsersController = require("../../controllers/UsersController")
const auth = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')
const {validateQuery} = require("../../middlewares/validation");
const {joiPatchUserSchema} = require("../../models/auth");

const UsersRouter = express.Router();

UsersRouter.get('/current', auth, UsersController.getCurrent)

UsersRouter.patch('/', auth, validateQuery(joiPatchUserSchema), UsersController.patchUser)

UsersRouter.patch('/avatar', auth, upload.single('avatar'), UsersController.updateAvatar)

module.exports = UsersRouter;

