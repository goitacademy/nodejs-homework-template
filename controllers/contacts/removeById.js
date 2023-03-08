const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Contacts with id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
