module.exports = {
    type: 'object',
    properties: {
      email: { type: 'string' },
      role: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['email', 'name', 'role'],
  };
  