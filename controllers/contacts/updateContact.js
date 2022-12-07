const { updateContact } = require("../../models/contacts");

const updatedContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updatedContact;
