const { nanoid } = require('nanoid');
const HTTP_STATUS = require('../../utils/httpStatusCodes');
const { user: service } = require('../../services');
const sendMail = require('../../utils/sendMail');

const reVerify = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'Error',
      code: HTTP_STATUS.BAD_REQUEST,
      message: 'Missing required field email',
    });
  }
  try {
    const user = await service.getOne({ email });
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: 'Error',
        code: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    if (user.verified) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'Verification has already been passed',
      });
    }

    const verifyCode = await nanoid();
    const mail = {
      to: email,
      subject: 'Please confirm your email',
      text: `Please click the following link to confirm your email and finish the registration: 
http://localhost:3003/api/v1/users/verify/${verifyCode}`,
    };
    await sendMail(mail);
  } catch (error) {
    next(error);
  }
};

module.exports = reVerify;