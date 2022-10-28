const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  if (!result) {
    throw RequestError(404, `Contact with id=${contactId} not found`);
  }

  res.json({ status: "success", code: 200, data: { result } });
};

module.exports = getById;
