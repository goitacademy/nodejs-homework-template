const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const putUpdateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFound(`Not found id=${contactId}`);
  }

  res.json({
    status: 200,
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = putUpdateById;
