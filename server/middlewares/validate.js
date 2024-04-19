const Ajv = require('ajv');
const util = require('util');

const ajv = new Ajv();
module.exports = schema => (req, res, next) => {
  const { params, query, body } = req;
  const validate = ajv.compile(schema);
  const valid = validate({
    ...params,
    ...query,
    ...body,
  });
  if (!valid) {
    return res.status(400).json({
      errors: validate.errors.map(e => `${e.dataPath} ${e.message} with ${util.inspect(e.params, { showHidden: true, deep: null })}`),
    });
  }
  return next();
};
