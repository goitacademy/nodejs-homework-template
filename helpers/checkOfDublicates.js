const HttpError = require("./HttpError");

const checkOfDublicates = (contact, contactsList) => {
  const result = contactsList.find((el) => el.phone === contact.phone);
  if (result) throw new HttpError(409, "this number has already existed");
};

module.exports = checkOfDublicates;
