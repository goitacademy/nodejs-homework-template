// const {
//   schemaPostContact,
//   schemaPutContact,
// } = require("../../schema/schema.js");

const validationBody = (schema) => {
  return async (req, res, next) => {
    const { name, email, phone } = req.body;
    try {
      if (name === undefined && email === undefined && phone === undefined) {
        const error = new Error("missing fields");
        error.status = 400;
        throw error;
      }

      await schema.validateAsync({ name, email, phone });
      next();
    } catch (error) {
      error.status = 400;
      next(error);
    }
  };
};
// validationBody(schemaPutContact)
module.exports = validationBody;
