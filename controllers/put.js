const { Contact } = require("../models/contact");
const { NotFound } = require("http-errors");

const updateById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    // eslint-disable-next-line no-undef
    throw new NotFound(`Contact with id ${id} not found`);
  }
  res.json({ status: "success", code: 200, data: req.body });
};
module.exports = updateById;
