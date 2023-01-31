const { Contact } = require("../../models");

const add = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    if (!result) {
     return res.status(404).json({message :"Bad request"})
    }

    res.status(201).json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;