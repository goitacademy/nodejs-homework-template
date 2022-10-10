const {Contact} = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = removeById;
