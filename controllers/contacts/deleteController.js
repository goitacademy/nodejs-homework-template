const { Contact } = require("../../models/contact");

const deleteController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await Contact.findByIdAndRemove(contactId);

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  deleteController,
};
