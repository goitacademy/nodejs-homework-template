const { basedir } = global;
const { Contact } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const updateContactById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body );
  
        if (!result) {
          throw createError(404);
        }
  
        res.json(result);
    } catch (error) {
      next(error);
    }
  };

module.exports = updateContactById;