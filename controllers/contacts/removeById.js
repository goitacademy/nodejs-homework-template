const RequestError = require("../../helpers/RequestError");
const Contact = require("../../models/contact");

const removeById = async (req, res) => {
  const { userId } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });

  if (result === null)
    throw RequestError(404, `There are no contacts with id: ${contactId}`);

  res.json(result);
};

module.exports = removeById;
