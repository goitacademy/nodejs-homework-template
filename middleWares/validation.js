const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            next(error);
        }
        next()
    }
}
module.exports = validation;



// Comments
// // створюємо ф-ю validation, яка в свою чергу буде створювати функцію, яка буде опрацьовувати запит
// // ця maiddleware оптрібна, щоб не писати всередині контроллера перевірку на івлідацію
// const validation = (schema) => {
//     return (req, res, next) => {
//         // із нашого запиту беремо req.body - і проводимо валідацію
//         // якщо не пройшла валідація, то error = true і викине помилку
//         const { error } = schema.validate(req.body);
//         // якщо ж  error = true, то next(error) - передасть помилку до app.js - до // 
//         // а сaме до middleware, яка має 4 параметри- app.use((err, req, res, next) - і виконається її код
//         if (error) {
//             error.status = 400;
//             next(error);
//         }
//         // якщо помилки не має (валідація пройшла успішно), то передаємо далі на виконнання до нашого контроллера
//         next()
//     }
// }

// module.exports = validation;