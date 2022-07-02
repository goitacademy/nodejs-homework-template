const { Conflict } = require('http-errors');
const { AuthService } = require('../../service/auth');
const { Unauthorized } = require('http-errors');
const { HttpStatusCode } = require('../../libs');
const { repositoryContacts, repositoryUsers } = require('../../repository');
const { NotFound } = require('http-errors');
const { AvatarStorage, CloudinaryStorage } = require('../../service/file-storage');
// const { AvatarStorage, LocalStorage } = require('../../service/file-storage');

class UsersController {
  async signupUser(req, res, next) {
    try {
      const { email } = req.body;
      const isUserExist = await AuthService.isUserExist(email);

      if (isUserExist) {
        throw new Conflict(`Email ${email} is already exist`);
      }

      const newUser = await AuthService.createUser(req.body);

      return res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        code: HttpStatusCode.CREATED,
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const authentificationUser = await AuthService.getUser(email, password);

      if (!authentificationUser) {
        throw new Unauthorized(`Email or password is wrong`);
      }

      const token = AuthService.getToken(authentificationUser);
      await AuthService.setToken(authentificationUser.id, token);

      return res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req, res, next) {
    try {
      await AuthService.setToken(req.user.id, null);
      res.status(HttpStatusCode.NO_CONTENT).json({
        status: 'success',
        code: HttpStatusCode.NO_CONTENT,
      });
    } catch (error) {
      next(error);
    }
  }

  async currentUser(req, res, next) {
    try {
      const { name, email, subscription } = req.user;
      res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: {
          user: {
            name,
            email,
            subscription,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async aggregation(req, res, next) {
    try {
      const { id } = req.params;

      const data = await repositoryContacts.getStatisticsContacts(id);
      if (data) {
        return res.status(HttpStatusCode.OK).json({
          status: 'success',
          code: HttpStatusCode.OK,
          data,
        });
      }
      throw new NotFound(`Not found`);
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req, res, next) {
    const uploadFileStorage = new AvatarStorage(CloudinaryStorage, req.file, req.user);
    // const uploadFileStorage = new AvatarStorage(LocalStorage, req.file, req.user);

    try {
      const avatarURL = await uploadFileStorage.newAvatars();
      res.status(HttpStatusCode.OK).json({ status: 'success', code: HttpStatusCode.OK, data: { avatarURL } });
    } catch (error) {
      next(error);
    }
  }

  async updateSubscriptionUser(req, res, next) {
    try {
      const { _id, name, email, createdAt, updatedAt } = req.user;
      const { subscription } = req.body;
      const result = await repositoryUsers.findByIdAndUpdate(_id, subscription);
      if (!result) {
        throw new NotFound(`subscription with id=${_id} not found!`);
      }
      res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: {
          user: {
            name,
            email,
            subscription,
            createdAt,
            updatedAt,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
