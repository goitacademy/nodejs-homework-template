const { Contact } = require("../../models/contacts");
const { BadRequest } = require("http-errors");
const { JoiSchemas } = require("../../models/contacts");



const contactUpdateInfo = async (req, res, next) => {
    try {
      const { error } = JoiSchemas.contactObjectUpdateSchema.validate(req.body);
      const { contactId } = req.params;
      if (error) {
        throw new BadRequest(
          "Hi, I'm BadRequest from PUT route. Message: validation is NOT successful"
        );
      }

      const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });

      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  module.exports  = contactUpdateInfo