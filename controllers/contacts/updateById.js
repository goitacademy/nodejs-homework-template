const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const updateById = async (req, res) => {
  const { id } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updateContact,
    },
  });
};

module.exports = updateById;