const HttpError = (status: number, message: string) => {
  const err = new Error(message) as any;
  err.status = status;
  return err;
};

export default HttpError;
