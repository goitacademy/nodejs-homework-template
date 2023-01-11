const { addContactSchema } = require("./contacts/addContactSchema");
const { putContactSchema } = require("./contacts/putContactSchema");
const { updateStatusSchema } = require("./contacts/updateStatusSchema");

module.exports = {
  addContactSchema,
  putContactSchema,
  updateStatusSchema,
};
