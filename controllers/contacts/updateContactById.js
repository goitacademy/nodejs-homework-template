const contacts = require("../../models/contacts");
// const { requestError } = require("../../helpers/");
// const schema = require("../../shemas/contactShema");

const updateContactById = async (req, res, next) => {
  //   const { error } = schema.add.validate(req.body);
  //   if (error) {
  //     throw requestError(400, error.message);
  //   }
  const { id } = req.params;
  const result = await contacts.updateContactById(id, req.body);
  //   if (!result) {
  //     throw requestError(404, `Id ${id} not found, try a different id`);
  //   }
  res.json(result);
};
module.exports = updateContactById;
