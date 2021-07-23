const { contact: service } = require("../../services");

const updateContactStatus = async (req, res, next) => {
    const { contactId } = req.params;
  
    const { favorite = false } = req.body;
  
    try {
      const result = await service.updateContactStatus(contactId, { favorite });
  
      if (req.body.favorite == null) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'missing field favorite',
          data: 'Not Found',
        });
      }
      await res.json({
        status: 'success',
        code: 200,
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  };

  module.exports = updateContactStatus;