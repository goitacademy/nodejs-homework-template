const { updateContactElement } = require('../../models/index');

const patchContact = async (req, res) => {
  const id = req.params.contactId;
  const { _id } = req.user;
  const { favorite } = req.body;

  const contact = await updateContactElement(id, { owner: _id, favorite });

  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  if (!contact) {
    return res.status(404).json({ message: `Not found ${contact}` });
  }
  res.status(200).json({ contact });
};

module.exports = { patchContact };
