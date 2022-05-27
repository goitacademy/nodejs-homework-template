const validateBody =
  (schema: any) =>
  async (req: any, res: any, next: any): Promise<any> => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      console.log(err.details);
      return res
        .status(400)
        .json({ status: "error", code: 400, message: err.message });
    }
  };

const validateParams =
  (schema: any) =>
  async (req: any, res: any, next: any): Promise<any> => {
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (err) {
      console.log(err.details);
      return res
        .status(400)
        .json({ status: "error", code: 400, message: err.message });
    }
  };

module.exports = { validateBody, validateParams };
