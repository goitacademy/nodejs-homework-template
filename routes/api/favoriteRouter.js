const express = require('express');
const router = express.Router();

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    if (req.body.favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { favorite: req.body.favorite },
      { new: true }
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
