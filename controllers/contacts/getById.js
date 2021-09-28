const { Contact } = require("../../models");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOne(
      { _id: contactId },
      '_id name email phone favorite',
    );
    if (!result) {
     
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error; 
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
}
}


module.exports = getById