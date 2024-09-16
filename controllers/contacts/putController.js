const { Contact } = require("../../models/contact");

const putController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  putController,
};
