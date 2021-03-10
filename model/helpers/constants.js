const Sex = {
    MALE: 'male',
    FEMALE: 'female',
    NONE: 'none'
}

const httpCode = {
    UNAUTHORIZED: 409,
    NOTFOUND: 404,
    REJECTED: 404,
    UNAUTHORIZED: 401,
    OK: 200,
    FORBIDDEN: 500,
    CONFLICT: 409,
    CREATE: 201,
    NOCONTENT: 204,
    BADREQUEST: 400
}

module.exports = {
    Sex,
    httpCode
}