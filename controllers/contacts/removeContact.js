const { ContactLeaveSchema } = require("../../models");
const { HttpError } = require("../../utils");

const removeContact = async (request, response) => {
    const { id } = request.params;
    const result = await ContactLeaveSchema.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    response.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  };

  module.exports = removeContact;