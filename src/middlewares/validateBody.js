import createHttpError from "http-errors";

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (error) {
      console.log({ message: error.message });
      console.log({ details: error.details });

      next(
        createHttpError(400, error.details.map((err) => err.message).join(", "))
      );
    }
  };
}
