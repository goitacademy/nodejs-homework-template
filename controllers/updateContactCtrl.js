const { contacts } = require("../models/contacts");
const { HttpError } = require("../helpers/index");

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const contactUpdate = await contacts.updateById(contactId, req.body);
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "Success",
    code: 200,
    data: {
      result: contactUpdate,
    },
  });
};

module.exports = updateContactCtrl;
