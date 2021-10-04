const contactsOperation = require('../../model/contacts/');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.getContactById(contactId);
    // проверка на наличие контакта с определенным Id, если такого контакта нет, то отправляем ответ сервера...
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    // ответ сервера если контакт найден
    res.json({
      status: 'sucsess',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
