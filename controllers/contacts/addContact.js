const { ContactLeaveSchema } = require("../../models");
const { contactComesSchema } = require("../../schemas");
const {  HttpError } = require("../../utils");

const addContact = async (request, response) => {
    const { error } = contactComesSchema.validate(request.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await ContactLeaveSchema.create(request.body);
    response.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  };

  module.exports = addContact;