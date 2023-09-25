const { basedir } = global;
const { Contact } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const getContactById = async (req, res, next) => {
  try {
    
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json(result);
    
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
