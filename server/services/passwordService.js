const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async plainPassword => bcrypt.hash(plainPassword, saltRounds);
const checkPassword = async (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

module.exports = { hashPassword, checkPassword };