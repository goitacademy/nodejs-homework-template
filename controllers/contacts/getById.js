const { Contact } = require("../../models/contacts");

const { HttpErrors } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findBuId(id);

  if (!result) {
    throw HttpErrors(404, "Not found");
  }

  res.json(result);
};

module.exports = getById;
