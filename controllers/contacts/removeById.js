const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const removeById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${id} deleted`,
    data: {
      result: contact,
    },
  });
};

module.exports = removeById;