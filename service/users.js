const User = require("../model/user");
const bcrypt = require('bcrypt');

const db = require("../lib/mongo");
const client = db();
const collection = 'users';

//register to user service
const register = async ({ password, name, email }) => {
  // password to hash
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash)
  const user = new User({
    name,
    password: passwordHash,
    email,
  });

  (await client).create(collection, user);
};

const login = async ({ email }) => {
  const user = (await client).get(collection, email);
  return user;
}

module.exports = {
  register,
  login,
};
