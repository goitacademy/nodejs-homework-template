const { cntModel } = require("../../models/contacts");
const { HttpError } = require("../../Helpers");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const removedContact = await cntModel.findByIdAndRemove(id);
  if (!removedContact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      removedContact,
    },
  });
};

module.exports = removeContact;
