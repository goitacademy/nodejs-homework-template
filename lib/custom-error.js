class CustomError extends Error {
    constructor(status, message, name = 'CustomError') {
        super()
        this.status = status
        this.name = name
        this.message = message
    }
}

export { CustomError}