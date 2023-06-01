const { cntModel } = require("../../models/contacts");
const { HttpError } = require("../../Helpers");

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await cntModel.findByIdAndUpdate(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = updateContact;
