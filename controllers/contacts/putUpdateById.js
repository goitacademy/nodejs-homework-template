const { NotFound } = require("http-errors");

const { updateContact } = require("../../models/contacts");

const putUpdateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await updateContact(
    contactId,
    req.body.name,
    req.body.email,
    req.body.phone
  );

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
