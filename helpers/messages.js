const { HttpCodes } = require("./constants");

const ResourseNotFoundMessage = {
  status: "error",
  code: HttpCodes.NOT_FOUND,
  message: "Not found.",
};

const ResponseMessages = {
  created: "New contact was created.",
  deleted: "Contact deleted.",
  updated: "Contact updated.",
  statusUpdated: "Contact's status updated.",
  emailInUse: "This email is already in use.",
  registedSuccess: "You registered successfully.",
  loginFail: "Invalid login or password.",
  loginSuccess: "You have logged in.",
  subcriptionUpdatedSuccess: "Subscription updated.",
  notAuthorized: "Not authorized.",
};

module.exports = { ResourseNotFoundMessage, ResponseMessages };
