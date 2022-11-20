const Contact = require('../../models/contact');

const { HTTPError } = require('../../helpers');

const updateById = async (req, res, next) => {
  // const { contactId } = req.params;
  // const result = await updateContact(contactId, req.body);
  // if (!result) {
  //   throw HTTPError(404);
  // }
  // res.json(result);
};

module.exports = updateById;
