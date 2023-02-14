const { NotFound } = require('http-errors');
const service = require('../../services');

const update = async ({ params: { id }, body }, res) => {
  const result = await service.update(id, body);

  if (!result) {
    throw NotFound(`contact with id:${id} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: `updated contact ${body.name} with id:${id}`,
    data: {
      result,
    },
  });
};

module.exports = update;
