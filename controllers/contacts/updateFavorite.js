const { updatingContact } = require('../../models/contacts');

const updateFavorite = async (req, res, next) => {
  try {
    if (req.body.favorite === undefined) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: "Missing field favorite. {'favorite': boolean }",
        payload: 'Missing field favorite',
      });
    }
    const { favorite = false } = req.body;
    const { contactId } = req.params;
    const contact = await updatingContact(contactId, { favorite });
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, payload: { favorite } });
    }
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact by id:${contactId}`,
      payload: 'Not Found',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateFavorite;
