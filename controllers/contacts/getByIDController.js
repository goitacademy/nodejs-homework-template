const { Contact } = require("../../models/contact");

const getByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);

    res.status(200).json({
      message: "Success",
      contactById,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: `Not found` });
  }
};

module.exports = {
  getByIdController,
};
