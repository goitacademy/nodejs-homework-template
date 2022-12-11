require("dotenv").config();
const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;
const sgMail = require("@sendgrid/mail");

const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

const errorHandler = (error, req, res, next) => {
  if (error.status && error.message) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({
      message: error.message,
    });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: error.message,
    });
  }
  res.status(500).json({ message: "Server Internal Error" });
};

const requestError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  asyncWrapper,
  errorHandler,
  requestError,
  sendEmail,
};
