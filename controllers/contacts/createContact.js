import { createContact, getContactByName } from '../../service/index.js';

async function createContacts(req, res, next) {
  const { name, email, phone, favorite } = req.body;
  try {
    const existingContact = await getContactByName(name);

    if (existingContact) {
      res.status(400).json({
        status: 'failed',
        code: 400,
        data: 'Not found',
        message: `Contact with name: '${name}' already exsist`,
      });
    } else {
      const result = await createContact({ name, email, phone, favorite });
      res.status(201).json({
        status: 'success',
        code: 201,
        data: { contact: result },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { createContacts };
