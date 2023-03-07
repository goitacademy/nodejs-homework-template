const service = require("../service/index");

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const contWithUpdatedStatus = await service.updateContStatus(id, {
      favorite,
    });
    if (contWithUpdatedStatus) {
      res.json({
        status: "success",
        code: 200,
        data: { contWithUpdatedStatus },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = updateStatus;
