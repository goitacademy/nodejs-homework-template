const { Contact } = require("../../model");
const { BadRequest, NotFound } = require("http-errors");
const { updateSchema } = require("../../validation");

const updateById = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      data,
    },
  });
 
};

module.exports = updateById;
