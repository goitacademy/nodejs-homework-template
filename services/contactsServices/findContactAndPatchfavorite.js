const { Contacts } = require('../../models/contacts');
const { createReject } = require('../../utils');

const findContactAndPatchfavorite = async (contactId, body) => {
  if (body?.favorite === undefined) {
    throw createReject(400, 'missing field favorite');
  }
  const result = await Contacts.findByIdAndUpdate(contactId, {
    favorite: body.favorite,
  });
  if (!result) {
    throw createReject(404, 'Not found');
  }

  return { ...result._doc, ...body };
};

module.exports = findContactAndPatchfavorite;
