// @ GET /api/contacts/:id

const contacts = require("../../models/contacts");

const { createError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (result) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact found",
        data: {
          result,
        },
      });
    } else {
      throw createError(404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
