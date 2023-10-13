// обгортка для контролерів, щоб не дублювати код try catch
// функція приймає контролер
// в середині містить асинхтонну функцію що приймає req, res, next та в середині містить try catch
// в блоці try викликається функція контролеру та якщо виникає помилка прокидується в блок catch
// обов'язково потрібно повернути функцію

const templateWrapper = (controller) => {
  const func = async (req, res, next) => {
    //функція обгортка, що ловить помилки
    try {
      await controller(req, res, next); // виклик котролеру, що приймає функція
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = templateWrapper;
