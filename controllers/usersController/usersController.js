const { Conflict, Unauthorized, NotFound, UnprocessableEntity, BadRequest } = require('http-errors');
const { authService } = require('../../service/auth');
const { HttpStatusCode } = require('../../libs');
const { repositoryContacts, repositoryUsers } = require('../../repository');
const { AvatarStorage, CloudinaryStorage } = require('../../service/file-storage');
const { EmailService, SenderSendgrid } = require('../../service/email');
// const { EmailService, SenderNodemailer } = require('../../service/email');
// const { AvatarStorage, LocalStorage } = require('../../service/file-storage');

class UsersController {
  async signupUser(req, res, next) {
    try {
      const { email } = req.body;
      const isUserExist = await authService.isUserExist(email);

      if (isUserExist) {
        throw new Conflict(`Email ${email} is already exist`);
      }

      const newUser = await authService.createUser(req.body);
      // const emailService = new EmailService(process.env.NODE_ENV, new SenderNodemailer());
      const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid());
      const isSend = await emailService.sendVerifyEmail(email, newUser.name, newUser.verificationTokenEmail);
      delete newUser.verificationTokenEmail;
      return res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        code: HttpStatusCode.CREATED,
        data: {
          ...newUser,
          isSendEmailVerify: isSend,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const authentificationUser = await authService.getUser(email, password);

      if (!authentificationUser) {
        throw new Unauthorized(`Email or password is wrong`);
      }

      const token = authService.getToken(authentificationUser);
      await authService.setToken(authentificationUser.id, token);

      return res.status(HttpStatusCode.OK).json({
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
      await authService.setToken(req.user.id, null);
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
      if (result) {
        return res.json({
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
      }

      throw new NotFound(`subscription with id=${_id} not found!`);
    } catch (error) {
      next(error);
    }
  }

  async verificationUser(req, res, next) {
    try {
      const verifyToken = req.params.token;
      const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
      if (userFromToken) {
        await repositoryUsers.updateVerify(userFromToken.id, true);
        return res
          .status(HttpStatusCode.OK)
          .json({ status: 'success', code: HttpStatusCode.OK, data: { message: 'Verification successful' } });
      }
      throw new BadRequest('User not found');
    } catch (error) {
      next(error);
    }
  }

  async repeatEmailForVerificationUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await repositoryUsers.findByEmail(email);

      if (user) {
        const { email, name, verificationTokenEmail } = user;
        const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid());
        // const emailService = new EmailService(process.env.NODE_ENV, new SenderNodemailer());

        const isSend = await emailService.sendVerifyEmail(email, name, verificationTokenEmail);

        if (isSend && verificationTokenEmail !== null) {
          return res.status(HttpStatusCode.OK).json({
            status: 'success',
            code: HttpStatusCode.OK,
            data: {
              name,
              email,
              isSendEmailVerify: isSend,
            },
          });
        }
        throw new UnprocessableEntity('Unprocessable Entity could not be processed');
      }
      throw new BadRequest('Verification has already been passed');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
