import { getContactById } from '../../service/index.js';

async function showContacts(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { showContacts };
