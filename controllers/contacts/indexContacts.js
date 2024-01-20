import { getAllContacts } from '../../service/index.js';

async function indexContacts(req, res, next) {
  try {
    const results = await getAllContacts();
    res.json({
      status: 'succes',
      code: 200,
      data: {
        contacts: results,
        contactsCount: results.length,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { indexContacts };
