const { basedir } = global;
const { Contact } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const removeContact =  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      
      if (!result) {
        throw createError(404);
      }
  
      res.json({
        message : 'deleted'  });
    } catch (error) {
      next(error);
    }
};

module.exports = removeContact;