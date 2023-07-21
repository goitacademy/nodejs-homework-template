const Contact = require('../../models');
const { catchAsync } = require('../../utils');

/**
 * Видалити контакт.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентифікатором контакту у параметрі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після видалення контакту.
 * @throws {Error} - Якщо сталася помилка при видаленні контакту.
 */
const removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.sendStatus(204);
});

module.exports = removeContact;
