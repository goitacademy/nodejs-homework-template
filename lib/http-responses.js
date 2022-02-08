const HTTP_RESPONSES = {
    ok: {
        code: 200,
        status: 'ok'
    },
    created: {
        code: 201,
        status: 'created',
    },
    noContent: {
        code: 204,
        status: 'No Content'
    },
    badRequest: {
        code: 400,
        status: 'bad request',
    },
    unauthorized: {
        code: 401,
        status: "Unauthorized"
    },
    wrongCredentials: {
        code: 401,
        status: 'Email or password is wrong'
    },
    notFound: {
        code: 404,
        status: "not found"
    },
    conflict: {
        code: 409,
        status: "conflict"
    },
    inUse: {
        code: 409,
        status: 'Email in use'
    },
    serverError: {
        code: 500,
        status: "server error"
    }
}

module.exports = HTTP_RESPONSES;
