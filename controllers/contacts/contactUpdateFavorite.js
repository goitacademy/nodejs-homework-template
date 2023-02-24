const { Contact } = require("../../models/contacts");
const { NotFound, BadRequest } = require("http-errors");
const { JoiSchemas } = require("../../models/contacts");


const contactUpdateFavorite = async (req, res, next) => {
    try {
      const { error } = JoiSchemas.contactUpdateFavoriteSchema.validate(
        req.body
      );
      const { contactId } = req.params;
      if (error) {
        throw new BadRequest(
          "Hi, I'm BadRequest from PATCH route.message: missing field favorite"
        );
      }
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });
      if (!result) {
        throw new NotFound("Oopsy, update hasn't come through");
      }
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }

module.exports = contactUpdateFavorite