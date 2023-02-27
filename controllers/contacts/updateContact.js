const { ContactLeaveSchema } = require("../../models");
const { contactComesSchema } = require("../../schemas");
const { HttpError } = require("../../utils");

const updateContact = async (request, response) => {
    const { error } = contactComesSchema.validate(request.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { id } = request.params;
    const result = await ContactLeaveSchema.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    response.json({
      status: "success",
      message: "update contact",
      code: 200,
      data: {
        result,
      },
    });
  };

  module.exports = updateContact;