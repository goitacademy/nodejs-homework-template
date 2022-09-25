const { contactsServices } = require("../../services");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsServices.update(contactId, req.body);
  res.status(200).json({
    status: "success",
    code: "200",
    payload: { result: updatedContact },
  });
};

module.exports = update;
