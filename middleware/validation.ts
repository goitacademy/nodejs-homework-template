const { HTTP_STATUS_CODE } = require("../../libs/constants");

const validateBody =
  (schema: any) =>
  async (req: any, res: any, next: any): Promise<any> => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      console.log(err.details);
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        status: "error",
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: err.message,
      });
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
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        status: "error",
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: err.message,
      });
    }
  };

module.exports = { validateBody, validateParams };
export {};
