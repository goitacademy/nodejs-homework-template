const Joi = require("joi");
const contactsOperations = require("../../model/contacts/");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.updateContactById(id, req.body);
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateContactById;
