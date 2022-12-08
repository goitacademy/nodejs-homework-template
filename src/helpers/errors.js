class myCastomError extends Error {
  constructor(massage) {
    super(massage);
    this.status = 400;
  }
}
class ValidationError extends myCastomError {
  constructor(massage) {
    super(massage);
    this.status = 400;
  }
}
class WrongParamerersError extends myCastomError {
  constructor(massage) {
    super(massage);
    this.status = 400;
  }
}
class NotAutorizedError extends myCastomError {
  constructor(massage) {
    super(massage);
    this.status = 401;
  }
}
module.exports = {
  myCastomError,
  ValidationError,
  WrongParamerersError,
  NotAutorizedError,
};
