const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById({ _id: id });
  if (!result) {
    const error = new Error(`Not found`);
    error.status = 404;
    throw error;
  }
  res.status(201).json(result);
};

module.exports = getById;
