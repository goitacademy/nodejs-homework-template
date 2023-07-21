const Contact = require('../../models');
const { catchAsync } = require('../../utils');

/**
 * Знайти контакт за ідентифікатором.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентифікатором контакту у параметрі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після знаходження контакту за ідентифікатором.
 * @throws {Error} - Якщо сталася помилка при пошуку контакту.
 */
const getOneContact = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.status(200).json({
    msg: 'Success',
    contact,
  });
});

module.exports = getOneContact;
