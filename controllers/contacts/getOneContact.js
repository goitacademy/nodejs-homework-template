const { Product } = require("../../model");

const getOneContact = async (req, res, next) => {
  try {
    const contact = await Product.findById(req.params.contactId);
    contact
      ? res.status(200).json({ contact, status: "success" })
      : res.status(404).json({ message: "Contact not found" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getOneContact;
