import { updateContact } from '../../service/index.js';

async function updateStatus(req, res, next) {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  try {
    const result = await updateContact(contactId, { favorite });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not found',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { updateStatus };
