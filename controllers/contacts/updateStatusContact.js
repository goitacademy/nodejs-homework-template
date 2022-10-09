const createError = require("http-errors");
const {Contact} = require('../../models/contact');

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    console.log(result);
    if (!result) {
      throw createError(404, `Not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  };
  
  module.exports = updateStatusContact;