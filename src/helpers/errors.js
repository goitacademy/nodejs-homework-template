class ValidationError extends Error {
  constructor(massage) {
    super(massage);
    this.status = 400;
  }
}
class WrongParamerersError extends Error {
  constructor(massage) {
    super(massage);
    this.status = 400;
  }
}
module.exports = {
  ValidationError,
  WrongParamerersError,
};
