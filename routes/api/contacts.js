import express from 'express';
import addContact from '#controllers/addContacts.js';
import listContacts from '#controllers/listContacts.js';
import verifyToken from '#middlewares/authMiddleware.js';
import updateContact from '#controllers/updateContact.js';
import removeContact from '#controllers/removeContacts.js';
import authController from '#controllers/authController.js';
import getContactById from '#controllers/getContactById.js';
import updateStatusContact from '#controllers/updateStatusContact.js';
import { addContactSchema, updateContactSchema } from '#validators/*';
import { bodyValidate } from '../middlewares/bodyValidate.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.get('/', verifyToken, (req, res) => {
  listContacts(req, res);
});

router.get('/:id', verifyToken, (req, res) => {
  getContactById(req, res);
});

router.post('/', verifyToken, bodyValidate(addContactSchema), (req, res) => {

  addContact(req, res);
});

router.delete('/:id', verifyToken, (req, res) => {
  removeContact(req, res);
});

router.put(
  '/:id',
  verifyToken,
  bodyValidate(updateContactSchema),
  (req, res) => {

    updateContact(req, res);
  }
);

router.patch('/:id/favorite', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined || typeof favorite !== 'boolean') {
    return res
      .status(400)
      .json({ message: 'Missing or invalid field "favorite"' });
  }

  try {
    const updatedContact = await updateStatusContact(id, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { contact: updatedContact },
    });
  } catch (error) {
    console.error('Error updating contact status:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
