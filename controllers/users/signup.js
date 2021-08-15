const { nanoid } = require('nanoid');
const { user: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');
const sendMail = require('../../utils/sendMail');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });

    if (user) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: 'Error',
        code: HTTP_STATUS.CONFLICT,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }
    const verifyCode = await nanoid();
    const newUser = await service.addUser({ password, email, verifyCode });

    const { _id, subscription, avatarURL } = newUser;

    const mail = {
      to: email,
      subject: 'Please confirm your email',
      text: `Please click the following link to confirm your email and finish the registration: 
http://localhost:3003/api/v1/users/verify/${verifyCode}`,
    };
    await sendMail(mail);

    res.status(HTTP_STATUS.CREATED).json({
      status: 'Success',
      code: HTTP_STATUS.CREATED,
      data: {
        user: { _id, email, subscription, avatarURL },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;