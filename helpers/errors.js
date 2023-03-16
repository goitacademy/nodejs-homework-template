class RegistrationValidationError extends Error{
    constructor(message) {
        super(message);
        this.status = 400
    }
}