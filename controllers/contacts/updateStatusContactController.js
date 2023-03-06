const { updateStatusContact } = require("../../services");
const { isEmpty } = require("../../helpers");
const contactValidation = require("../../middlewares/contactsValidation");

const updateStatusContactController = async (req, res) => {
  const { contactId: id } = req.params;
  const {id: owner} = req.user;
  const { error } = contactValidation.validate(req.body);
  
  if (isEmpty(req.body)) {
    return res.status(400).json({
      message: "missing field favorite",
    });
  }

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updateStatus = await updateStatusContact(id, owner, req.body);

  if (!updateStatus) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json(updateStatus);
};

module.exports = updateStatusContactController;
