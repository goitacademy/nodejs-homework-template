// const messages = {
//     400: 'Bad Request',
//     401: 'Unauthorized',
//     403: 'Forbbiden',
//     404: 'Not found',
//     409: 'Conflic'
// }


const RequestError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = RequestError