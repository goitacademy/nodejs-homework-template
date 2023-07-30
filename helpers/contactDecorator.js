const contactDecorator = (controller) => {
    const func = async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  
    return func;
  };
  
  export default contactDecorator;
  