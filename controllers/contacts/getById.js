const { NotFound } = require("http-errors");

const Contact = require("../../models/contact");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
