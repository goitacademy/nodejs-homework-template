const { Contact } = require("../models/contactModel");
const { HttpError } = require("../helpers");

const doesContactExist = async (req, res, next) => {
  const { email, phone } = req.body;
  const doesExist = await Contact.exists({
    $or: [{ email: email }, { phone: phone }],
  });
  console.log(doesExist);
  if (doesExist) {
    next(HttpError(409, "Contact already exists"));
    return;
  }
  next();
};

module.exports = doesContactExist;
