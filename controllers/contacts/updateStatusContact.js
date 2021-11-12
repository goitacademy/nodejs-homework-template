const { Contact } = require("../../model");
const { BadRequest, NotFound } = require("http-errors");
const { schemaUpdateStatus } = require("../../validation");

const updateStatusContact = async (req, res) => {
  const { error } = schemaUpdateStatus.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { contactId } = req.params;
  const { favorite } = req.body;
  const data = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!data) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    message: `Contact's status updated`,
    code: 200,
    data: {
      data,
    },
  });

};

module.exports = updateStatusContact;
