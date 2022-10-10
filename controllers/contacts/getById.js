const {Contact} = require("../../models/contacts");

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id)
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = getById;
