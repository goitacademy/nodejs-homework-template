const Contact = require("../../models/contacts");
const { requestError } = require("../../utils");

const getByIdContactFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(`${result.name} in your favorites ${result.favorite}`);
};

module.exports = getByIdContactFavorite;
