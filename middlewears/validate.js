const ERROR_TYPES = require('../../../constants/errors');
const createError = require('../../../utils/createError');

const validate =
  // за допомогою цього ступеня ми додаємо в область видимості (скоуп) функції
  // змінну target, яку далі можна використовувати. Те, що вона додається окремим
  //  викликом, робить можливість "конфігурувати" поведінку middleware


    (target) =>
    //? те саме, що і вище, але додаємо schema
    (schema) =>
    // це наша звичайна функія, що виконує роль middleware. Її сигнатура визначена
    // за загальним контрактом
    (req, res, next) => {
      const result = schema.validate(req[target], { abortEarly: false });

      if (result.error) {
        const error = createError(ERROR_TYPES.BAD_REQUEST, {
          data: result.error.details,
          message: result.error.message,
        });
        next(error);
      } else {
        next();
      }
    };

/*
    Використання:
    1. Перший раз ми можемо утворити похідні функції від validate через вказівку
      таргету валідації. Виглядає це так:
          const validateBody = validate('body');
      Таким чином ми із загальної функції валідації реквестів отримуємо
      більш специфічну, для валідації тіла(body)
    2. Другий раз (вже всередині middleware) ми створюємо похідну вже від 
      validateBody:
        const validateBodyWithSchema = validateBody(createAnimalBodySchema)
      Після цього наш валідатор вже знає, яку схему варто використовувати 
      всередині функції
*/
module.exports = validate;