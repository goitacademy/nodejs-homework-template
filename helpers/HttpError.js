// Функція отримує в якості параметра статус і меседж
const HttpError = (status, message) => {
    // створюємо помилку з меседжем
    const error = new Error(message);
     // присвоюємо переданий статус
    error.status = status;
    return error;
};

module.exports = HttpError;
