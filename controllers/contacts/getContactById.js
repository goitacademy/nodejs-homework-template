const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new HttpError(404, "Contacts with such id is not found");
  }
  res.json(result);
};

module.exports = getContactById;
