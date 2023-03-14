const { contactList } = require("../models/contacts");
const AppError = require("../utils/appError");
const { errorCatcher } = require("../utils/errorCatcherWrapper");

/**
 * Check new user data.
 */
const checkUserData = (req, res, next) => {
  // You can write some validators here..
  console.log("||== NEW USER DATA =====>>>>>>>>>>>");
  console.log(req.body);
  console.log("<<<<<<<<<<<=============||");

  next();
};

const checkUserId = async (req, res, next) => {
  const id = req.params.contactId.toString();

  const contacts = await errorCatcher(await contactList());
  console.log(contacts);

  if (contacts.find((contact) => contact.id === id)) {
    console.log("=============OK=============");
    console.log("id exists");

    next();

    return;
  }

  console.log("=============ERROR=============");
  console.log("NO id ");

  return next(new AppError(404, "User with this id does not exist.."));
};

module.exports = {
  checkUserData,
  checkUserId,
};
