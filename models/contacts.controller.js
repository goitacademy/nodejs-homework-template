const get = async (req, res, next) => {
    try {
      const results = await service.getAlltasks();
      res.json({
        status: 'success',
        code: 200,
        data: {
          tasks: results,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  