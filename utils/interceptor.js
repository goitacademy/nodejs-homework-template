module.exports = {
  mockRequest: () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.user = jest.fn().mockReturnValue(req);
    req.passwordCompare = jest.fn().mockReturnValue(req);
    return req;
  },

  mockResponse: () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  },
  mockNext: () => jest.fn(),
};
