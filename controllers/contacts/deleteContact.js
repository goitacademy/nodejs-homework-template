const { Product } = require("../../model");

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Product.findByIdAndRemove(req.params.contactId);

    res.status(200).json({ message: " contact was removed successfully" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = deleteContact;
