const {Contact} = require('../../models')

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateConract = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!req.body) {
      return res.status(404).json({
        message: "missing fields",
      });
    }
    res.json({
      updateConract,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
