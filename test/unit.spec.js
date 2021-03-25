const fs = require('fs/promises');
const createFolder = require('../helpers/create-dir');

jest.mock('fs/promises');

describe('Unit test create-dir.js', () => {
  fs.mkdir = jest.fn(() => {});
  it('run function', async done => {
    fs.access = jest.fn().mockImplementation(() => Promise.resolve(true));
    await createFolder('test-unit');
    done();
  });
  it('run function', async done => {
    fs.access = jest.fn().mockImplementation(() => Promise.reject(false));
    await createFolder('test-unit');
    done();
  });
});
