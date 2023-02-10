const { Contact } = require("../../models/contact");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return null;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
