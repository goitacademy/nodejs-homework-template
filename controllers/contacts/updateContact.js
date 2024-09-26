// const Joi = require("joi");

const { updateContact } = require("../../models/contacts");


const validateSchema = require('../../utils/schema');

const updateControllers = async (req, res) => {
  
    const { error } = validateSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const contact = await updateContact(id, req.body);
    if (!contact) {
      throw createError(404, `user with id=${id} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  }

module.exports = updateControllers;
