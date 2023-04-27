// const ErrorMesseges = {
//     400 : "message: Missing required name field",
//     404: "message: Not found"
// }; 


const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

module.exports =  HttpError;
